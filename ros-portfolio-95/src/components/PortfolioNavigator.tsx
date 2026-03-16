import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Rect, Line, Circle, Text } from 'react-konva';
import { generateMaze, getValidSpawnPositions, type Maze } from '../utils/mazeGenerator';
import { findPath } from '../utils/pathfinding';
import './PortfolioNavigator.css';

interface PortfolioNavigatorProps {
  onIconReached: (iconId: string) => void;
}

interface TurtlePosition {
  x: number;
  y: number;
  gridX: number;
  gridY: number;
}

interface TargetIcon {
  id: string;
  label: string;
  gridX: number;
  gridY: number;
  emoji: string;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const MAZE_COLS = 20;
const MAZE_ROWS = 15;
const CELL_SIZE = 40;

const PortfolioNavigator: React.FC<PortfolioNavigatorProps> = ({ onIconReached }) => {
  const [maze, setMaze] = useState<Maze | null>(null);
  const [turtle, setTurtle] = useState<TurtlePosition>({ x: 20, y: 20, gridX: 0, gridY: 0 });
  const [exploredCells, setExploredCells] = useState<Set<string>>(new Set(['0,0']));
  const [targets, setTargets] = useState<TargetIcon[]>([]);
  const [mode, setMode] = useState<'teleop' | 'auto'>('teleop');
  const [showFullMaze, setShowFullMaze] = useState(false);
  const [path, setPath] = useState<{ x: number; y: number }[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);

  const stageRef = useRef<any>(null);
  const navigationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate maze on mount
  useEffect(() => {
    const newMaze = generateMaze(MAZE_COLS, MAZE_ROWS, CELL_SIZE);
    setMaze(newMaze);

    // Place target icons in valid positions (not at spawn point 0,0)
    const validPositions = getValidSpawnPositions(newMaze).filter(
      pos => !(pos.x === 0 && pos.y === 0) // Exclude spawn point
    );

    const targetIcons: TargetIcon[] = [
      { id: 'experience', label: 'Experience', emoji: '📁', gridX: 0, gridY: 0 },
      { id: 'skills', label: 'Skills', emoji: '🛠️', gridX: 0, gridY: 0 },
      { id: 'education', label: 'Education', emoji: '🎓', gridX: 0, gridY: 0 },
      { id: 'contact', label: 'Contact', emoji: '📧', gridX: 0, gridY: 0 },
      { id: 'hobbies', label: 'Hobbies', emoji: '🎨', gridX: 0, gridY: 0 },
    ];

    // Distribute targets well across maze (different quadrants)
    const quadrants = [
      validPositions.filter(p => p.x < MAZE_COLS/2 && p.y < MAZE_ROWS/2), // Top-left
      validPositions.filter(p => p.x >= MAZE_COLS/2 && p.y < MAZE_ROWS/2), // Top-right
      validPositions.filter(p => p.x < MAZE_COLS/2 && p.y >= MAZE_ROWS/2), // Bottom-left
      validPositions.filter(p => p.x >= MAZE_COLS/2 && p.y >= MAZE_ROWS/2), // Bottom-right
      validPositions.filter(p => p.x >= MAZE_COLS/3 && p.x < 2*MAZE_COLS/3), // Center
    ];

    targetIcons.forEach((icon, i) => {
      const quadrant = quadrants[i % quadrants.length];
      if (quadrant.length > 0) {
        const pos = quadrant[Math.floor(Math.random() * quadrant.length)];
        icon.gridX = pos.x;
        icon.gridY = pos.y;
      }
    });

    setTargets(targetIcons);
  }, []);

  // Handle keyboard controls
  useEffect(() => {
    if (mode !== 'teleop' || !maze) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      let newGridX = turtle.gridX;
      let newGridY = turtle.gridY;

      // Determine direction
      if (key === 'arrowup' || key === 'w') {
        newGridY--;
        e.preventDefault(); // Prevent window scroll
      } else if (key === 'arrowdown' || key === 's') {
        newGridY++;
        e.preventDefault(); // Prevent window scroll
      } else if (key === 'arrowleft' || key === 'a') {
        newGridX--;
        e.preventDefault(); // Prevent window scroll
      } else if (key === 'arrowright' || key === 'd') {
        newGridX++;
        e.preventDefault(); // Prevent window scroll
      } else return;

      // Check bounds
      if (newGridX < 0 || newGridX >= MAZE_COLS || newGridY < 0 || newGridY >= MAZE_ROWS) return;

      // Check walls
      const currentCell = maze.grid[turtle.gridY][turtle.gridX];
      const canMove = checkCanMove(currentCell, newGridX, newGridY, turtle.gridX, turtle.gridY);

      if (canMove) {
        const newX = newGridX * CELL_SIZE + CELL_SIZE / 2;
        const newY = newGridY * CELL_SIZE + CELL_SIZE / 2;

        setTurtle({ x: newX, y: newY, gridX: newGridX, gridY: newGridY });

        // Mark cell as explored
        setExploredCells(prev => new Set(prev).add(`${newGridX},${newGridY}`));

        // Check if reached a target
        const reachedTarget = targets.find(t => t.gridX === newGridX && t.gridY === newGridY);
        if (reachedTarget) {
          onIconReached(reachedTarget.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, turtle, maze, targets, onIconReached]);

  const checkCanMove = (cell: any, newX: number, newY: number, oldX: number, oldY: number): boolean => {
    const dx = newX - oldX;
    const dy = newY - oldY;

    if (dy === -1 && cell.walls.top) return false;
    if (dy === 1 && cell.walls.bottom) return false;
    if (dx === -1 && cell.walls.left) return false;
    if (dx === 1 && cell.walls.right) return false;

    return true;
  };

  // Handle target click in auto mode
  const handleTargetClick = (target: TargetIcon) => {
    if (mode !== 'auto' || !maze || isNavigating) return;

    // Find path from current position to target
    const foundPath = findPath(
      maze,
      { x: turtle.gridX, y: turtle.gridY },
      { x: target.gridX, y: target.gridY }
    );

    if (foundPath) {
      setPath(foundPath);
      setIsNavigating(true);
      animatePath(foundPath);
    }
  };

  // Animate turtle along path
  const animatePath = (pathToFollow: { x: number; y: number }[]) => {
    let stepIndex = 0;

    const moveStep = () => {
      if (stepIndex >= pathToFollow.length) {
        setIsNavigating(false);
        setPath([]);

        // Check if reached a target using the final position from path
        const finalPos = pathToFollow[pathToFollow.length - 1];
        const reachedTarget = targets.find(
          t => t.gridX === finalPos.x && t.gridY === finalPos.y
        );
        if (reachedTarget) {
          onIconReached(reachedTarget.id);
        }
        return;
      }

      const nextPos = pathToFollow[stepIndex];
      const newX = nextPos.x * CELL_SIZE + CELL_SIZE / 2;
      const newY = nextPos.y * CELL_SIZE + CELL_SIZE / 2;

      setTurtle({
        x: newX,
        y: newY,
        gridX: nextPos.x,
        gridY: nextPos.y,
      });

      // Mark cell as explored
      setExploredCells(prev => new Set(prev).add(`${nextPos.x},${nextPos.y}`));

      stepIndex++;
      navigationTimerRef.current = setTimeout(moveStep, 200); // 200ms per step
    };

    moveStep();
  };

  // Cleanup navigation timer on unmount
  useEffect(() => {
    return () => {
      if (navigationTimerRef.current) {
        clearTimeout(navigationTimerRef.current);
      }
    };
  }, []);

  if (!maze) return <div>Generating maze...</div>;

  return (
    <div className="navigator-container">
      <div className="navigator-controls">
        <button
          className={mode === 'teleop' ? 'active' : ''}
          onClick={() => setMode('teleop')}
        >
          🎮 Teleop Mode
        </button>
        <button
          className={mode === 'auto' ? 'active' : ''}
          onClick={() => setMode('auto')}
        >
          🤖 Auto Navigate
        </button>
        <button
          className={showFullMaze ? 'active' : ''}
          onClick={() => setShowFullMaze(!showFullMaze)}
          title="Toggle fog-of-war"
        >
          {showFullMaze ? '🗺️ Hide Maze' : '🌫️ Show Full Maze'}
        </button>
        <div className="instructions">
          {mode === 'teleop' ? '← Use WASD or Arrow Keys →' : 'Click a target to navigate'}
        </div>
      </div>

      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={stageRef}>
        <Layer>
          {/* Background */}
          <Rect width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="#000000" />

          {/* Render maze cells (either explored only or full maze based on toggle) */}
          {(showFullMaze
            ? maze.grid.flatMap((row, gy) => row.map((cell, gx) => `${gx},${gy}`))
            : Array.from(exploredCells)
          ).map(cellKey => {
            const [gx, gy] = cellKey.split(',').map(Number);
            const cell = maze.grid[gy][gx];
            const isExplored = exploredCells.has(cellKey);

            return (
              <Rect
                key={cellKey}
                x={gx * CELL_SIZE}
                y={gy * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill={isExplored ? "#1a1a1a" : "#0a0a0a"}
              />
            );
          })}

          {/* Render walls (either explored only or full maze based on toggle) */}
          {(showFullMaze
            ? maze.grid.flatMap((row, gy) => row.map((cell, gx) => `${gx},${gy}`))
            : Array.from(exploredCells)
          ).map(cellKey => {
            const [gx, gy] = cellKey.split(',').map(Number);
            const cell = maze.grid[gy][gx];
            const x = gx * CELL_SIZE;
            const y = gy * CELL_SIZE;

            return (
              <React.Fragment key={`walls-${cellKey}`}>
                {cell.walls.top && (
                  <Line
                    points={[x, y, x + CELL_SIZE, y]}
                    stroke="#00ff00"
                    strokeWidth={2}
                  />
                )}
                {cell.walls.right && (
                  <Line
                    points={[x + CELL_SIZE, y, x + CELL_SIZE, y + CELL_SIZE]}
                    stroke="#00ff00"
                    strokeWidth={2}
                  />
                )}
                {cell.walls.bottom && (
                  <Line
                    points={[x, y + CELL_SIZE, x + CELL_SIZE, y + CELL_SIZE]}
                    stroke="#00ff00"
                    strokeWidth={2}
                  />
                )}
                {cell.walls.left && (
                  <Line
                    points={[x, y, x, y + CELL_SIZE]}
                    stroke="#00ff00"
                    strokeWidth={2}
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* Render path visualization in auto mode */}
          {mode === 'auto' && path.length > 0 && (
            <>
              {path.map((pos, i) => (
                <Rect
                  key={`path-${i}`}
                  x={pos.x * CELL_SIZE + CELL_SIZE / 4}
                  y={pos.y * CELL_SIZE + CELL_SIZE / 4}
                  width={CELL_SIZE / 2}
                  height={CELL_SIZE / 2}
                  fill="#ffff00"
                  opacity={0.3}
                />
              ))}
            </>
          )}

          {/* Render ALL targets (always visible, not hidden by fog-of-war) */}
          {targets.map(target => {
            return (
              <Text
                key={target.id}
                x={target.gridX * CELL_SIZE + CELL_SIZE / 4}
                y={target.gridY * CELL_SIZE + CELL_SIZE / 4}
                text={target.emoji}
                fontSize={24}
                onClick={() => handleTargetClick(target)}
                onTap={() => handleTargetClick(target)}
                style={{ cursor: mode === 'auto' ? 'pointer' : 'default' }}
              />
            );
          })}

          {/* Turtle */}
          <Circle
            x={turtle.x}
            y={turtle.y}
            radius={12}
            fill="#00ffff"
            stroke="#ffffff"
            strokeWidth={2}
          />
        </Layer>
      </Stage>

      <div className="mini-map">
        <div className="mini-map-title">Explored: {exploredCells.size}/{MAZE_COLS * MAZE_ROWS}</div>
      </div>
    </div>
  );
};

export default PortfolioNavigator;

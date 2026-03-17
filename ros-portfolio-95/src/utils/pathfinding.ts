import type { Maze } from './mazeGenerator';

interface Node {
  x: number;
  y: number;
  g: number; // Cost from start
  h: number; // Heuristic cost to goal
  f: number; // Total cost (g + h)
  parent: Node | null;
}

interface Position {
  x: number;
  y: number;
}

/**
 * Manhattan distance heuristic
 */
function heuristic(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/**
 * Check if we can move from current cell to neighbor
 */
function canMove(maze: Maze, current: Position, next: Position): boolean {
  const dx = next.x - current.x;
  const dy = next.y - current.y;

  const cell = maze.grid[current.y][current.x];

  if (dy === -1 && cell.walls.top) return false;
  if (dy === 1 && cell.walls.bottom) return false;
  if (dx === -1 && cell.walls.left) return false;
  if (dx === 1 && cell.walls.right) return false;

  return true;
}

/**
 * Get valid neighbors for a position
 */
function getNeighbors(maze: Maze, pos: Position): Position[] {
  const neighbors: Position[] = [];
  const directions = [
    { x: 0, y: -1 }, // Up
    { x: 1, y: 0 },  // Right
    { x: 0, y: 1 },  // Down
    { x: -1, y: 0 }, // Left
  ];

  for (const dir of directions) {
    const nextX = pos.x + dir.x;
    const nextY = pos.y + dir.y;

    // Check bounds
    if (nextX < 0 || nextX >= maze.width || nextY < 0 || nextY >= maze.height) {
      continue;
    }

    // Check if we can move there
    if (canMove(maze, pos, { x: nextX, y: nextY })) {
      neighbors.push({ x: nextX, y: nextY });
    }
  }

  return neighbors;
}

/**
 * Find node in list by position
 */
function findNode(list: Node[], pos: Position): Node | undefined {
  return list.find(n => n.x === pos.x && n.y === pos.y);
}

/**
 * A* pathfinding algorithm
 * Returns path as array of positions from start to goal
 */
export function findPath(
  maze: Maze,
  start: Position,
  goal: Position
): Position[] | null {
  const openList: Node[] = [];
  const closedList: Node[] = [];

  // Create start node
  const startNode: Node = {
    x: start.x,
    y: start.y,
    g: 0,
    h: heuristic(start, goal),
    f: heuristic(start, goal),
    parent: null,
  };

  openList.push(startNode);

  while (openList.length > 0) {
    // Get node with lowest f score
    let currentIndex = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[currentIndex].f) {
        currentIndex = i;
      }
    }

    const current = openList[currentIndex];

    // Goal reached
    if (current.x === goal.x && current.y === goal.y) {
      const path: Position[] = [];
      let node: Node | null = current;

      while (node !== null) {
        path.unshift({ x: node.x, y: node.y });
        node = node.parent;
      }

      return path;
    }

    // Move current from open to closed
    openList.splice(currentIndex, 1);
    closedList.push(current);

    // Check neighbors
    const neighbors = getNeighbors(maze, { x: current.x, y: current.y });

    for (const neighborPos of neighbors) {
      // Skip if in closed list
      if (findNode(closedList, neighborPos)) {
        continue;
      }

      const gScore = current.g + 1; // Cost is 1 per move
      const hScore = heuristic(neighborPos, goal);
      const fScore = gScore + hScore;

      // Check if neighbor is in open list
      const existingNode = findNode(openList, neighborPos);

      if (existingNode) {
        // Update if this path is better
        if (gScore < existingNode.g) {
          existingNode.g = gScore;
          existingNode.f = fScore;
          existingNode.parent = current;
        }
      } else {
        // Add to open list
        const newNode: Node = {
          x: neighborPos.x,
          y: neighborPos.y,
          g: gScore,
          h: hScore,
          f: fScore,
          parent: current,
        };
        openList.push(newNode);
      }
    }
  }

  // No path found
  return null;
}

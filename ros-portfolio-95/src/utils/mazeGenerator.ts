export interface Cell {
  x: number;
  y: number;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean;
}

export interface Maze {
  width: number;
  height: number;
  cellSize: number;
  grid: Cell[][];
}

/**
 * Generate a maze using recursive backtracking algorithm
 * @param width - Number of cells wide
 * @param height - Number of cells tall
 * @param cellSize - Size of each cell in pixels
 * @param seed - Random seed for reproducible mazes (optional)
 */
export function generateMaze(
  width: number,
  height: number,
  cellSize: number = 40,
  seed?: number
): Maze {
  // Initialize grid
  const grid: Cell[][] = [];
  for (let y = 0; y < height; y++) {
    grid[y] = [];
    for (let x = 0; x < width; x++) {
      grid[y][x] = {
        x,
        y,
        walls: { top: true, right: true, bottom: true, left: true },
        visited: false,
      };
    }
  }

  // Simple seeded random (if seed provided)
  let randomSeed = seed || Math.floor(Math.random() * 1000000);
  const seededRandom = () => {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    return randomSeed / 233280;
  };

  // Recursive backtracking
  const stack: Cell[] = [];
  let current = grid[0][0];
  current.visited = true;

  const getUnvisitedNeighbors = (cell: Cell): Cell[] => {
    const neighbors: Cell[] = [];
    const { x, y } = cell;

    if (y > 0 && !grid[y - 1][x].visited) neighbors.push(grid[y - 1][x]); // Top
    if (x < width - 1 && !grid[y][x + 1].visited) neighbors.push(grid[y][x + 1]); // Right
    if (y < height - 1 && !grid[y + 1][x].visited) neighbors.push(grid[y + 1][x]); // Bottom
    if (x > 0 && !grid[y][x - 1].visited) neighbors.push(grid[y][x - 1]); // Left

    return neighbors;
  };

  const removeWalls = (current: Cell, next: Cell) => {
    const dx = current.x - next.x;
    const dy = current.y - next.y;

    if (dx === 1) {
      // Next is left
      current.walls.left = false;
      next.walls.right = false;
    } else if (dx === -1) {
      // Next is right
      current.walls.right = false;
      next.walls.left = false;
    }

    if (dy === 1) {
      // Next is top
      current.walls.top = false;
      next.walls.bottom = false;
    } else if (dy === -1) {
      // Next is bottom
      current.walls.bottom = false;
      next.walls.top = false;
    }
  };

  while (true) {
    const neighbors = getUnvisitedNeighbors(current);

    if (neighbors.length > 0) {
      // Choose random unvisited neighbor
      const next = neighbors[Math.floor(seededRandom() * neighbors.length)];

      stack.push(current);
      removeWalls(current, next);

      next.visited = true;
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop()!;
    } else {
      break;
    }
  }

  // Reset visited flags for gameplay
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      grid[y][x].visited = false;
    }
  }

  return { width, height, cellSize, grid };
}

/**
 * Get valid spawn positions (cells without all walls)
 */
export function getValidSpawnPositions(maze: Maze): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];

  for (let y = 0; y < maze.height; y++) {
    for (let x = 0; x < maze.width; x++) {
      const cell = maze.grid[y][x];
      // Check if cell has at least one open wall
      if (
        !cell.walls.top ||
        !cell.walls.right ||
        !cell.walls.bottom ||
        !cell.walls.left
      ) {
        positions.push({ x, y });
      }
    }
  }

  return positions;
}

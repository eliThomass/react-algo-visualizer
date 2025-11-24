
export function dfs(i, j, target, maze, visit = new Set(), history = []) {
    let ROWS = maze.length;
    let COLS = maze[0].length;
    let key = `${i},${j}`;
    
    if(i >= ROWS || j >= COLS || i < 0 || j < 0 || visit.has(key) || maze[i][j] === 1) {
        return
    }
    if(i === target[0] && j === target[1]) {
        history.push({ r: i, c: j, val: 3 });
        return true
    }

    visit.add(key)
    if (i === 0 && j === 0) {
        history.push({ r: i, c: j, val: 4 });
    } else {
        history.push({ r: i, c: j, val: 2 });
    }

    let found = dfs(i + 1, j, target, maze, visit, history) 
        || dfs(i, j + 1, target, maze, visit, history) 
        || dfs(i - 1, j, target, maze, visit, history) 
        || dfs(i, j - 1, target, maze, visit, history);

    if(!found) {
        history.push({ r: i, c: j, val: 0 });
    }

    return found
}

export function bfs() {
    console.log("hello!");
}
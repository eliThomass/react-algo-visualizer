
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

export function bfs(i, j, target, maze, visit = new Set(), history = []) {
    let ROWS = maze.length;
    let COLS = maze[0].length;
    let queue = [[i, j]];
    let key = `${i},${j}`;

    visit.add(key);
    if (i === 0 && j === 0) {
        history.push({ r: i, c: j, val: 4 });
    } else {
        history.push({ r: i, c: j, val: 2 });
    }

    while(queue.length > 0) {
        let [currI, currJ] = queue.shift();

        if(currI === target[0] && currJ === target[1]) {
            history.push({ r: currI, c: currJ, val: 3 });
            return true;
        }

        let neighbors = [[currI + 1, currJ], [currI, currJ + 1], [currI - 1, currJ], [currI, currJ - 1]];

        for (let [nextI, nextJ] of neighbors) {
            let nextKey = `${nextI},${nextJ}`;

            if(nextI >= ROWS || nextJ >= COLS || nextI < 0 || nextJ < 0 || visit.has(nextKey) || maze[nextI][nextJ] === 1) {
                continue;
            }

            visit.add(nextKey);
            history.push({ r: nextI, c: nextJ, val: 2 });
            queue.push([nextI, nextJ]);
        }
    }

    return false;
}
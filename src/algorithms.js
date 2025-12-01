
export function dfs(i, j, target, maze, visit = new Set(), history = []) {
    let ROWS = maze.length;
    let COLS = maze[0].length;
    let key = `${i},${j}`;
    
    if(i >= ROWS || j >= COLS || i < 0 || j < 0 || visit.has(key) || maze[i][j] === 1) {
        return
    }

    visit.add(key)
    if (i === 0 && j === 0) {
        history.push({ r: i, c: j, val: 4 }); // Start
    } else if (i === target[0] && j === target[1]) {
        history.push({ r: i, c: j, val: 3 }); // Target
        return true;
    } else {
        history.push({ r: i, c: j, val: 2 }); // Visited
    }

    let found = dfs(i + 1, j, target, maze, visit, history) 
        || dfs(i, j + 1, target, maze, visit, history) 
        || dfs(i - 1, j, target, maze, visit, history) 
        || dfs(i, j - 1, target, maze, visit, history);

    if(!found) {
        // Backtrack - mark as visited but dead end
        if (!(i === 0 && j === 0)) {
            history.push({ r: i, c: j, val: 0 });
        }
    } else {
        // Found path, mark as path (blue), excluding start
        if (!(i === 0 && j === 0) && !(i === target[0] && j === target[1])) {
            history.push({ r: i, c: j, val: 5 });
        }
    }

    return found
}

export function bfs(i, j, target, maze, visit = new Set(), history = []) {
    let ROWS = maze.length;
    let COLS = maze[0].length;
    let queue = [[i, j]];
    let key = `${i},${j}`;

    let parentMap = new Map();

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
            
            let curr = parentMap.get(`${currI},${currJ}`);
            while (curr) {
                let [pI, pJ] = curr;
                if (pI === 0 && pJ === 0) break;
                
                history.push({ r: pI, c: pJ, val: 5 });
                curr = parentMap.get(`${pI},${pJ}`);
            }
            
            return true;
        }

        let neighbors = [[currI + 1, currJ], [currI, currJ + 1], [currI - 1, currJ], [currI, currJ - 1]];

        for (let [nextI, nextJ] of neighbors) {
            let nextKey = `${nextI},${nextJ}`;

            if(nextI >= ROWS || nextJ >= COLS || nextI < 0 || nextJ < 0 || visit.has(nextKey) || maze[nextI][nextJ] === 1) {
                continue;
            }

            visit.add(nextKey);
            parentMap.set(nextKey, [currI, currJ]);
            if (nextI === target[0] && nextJ === target[1]) {
            } else {
                history.push({ r: nextI, c: nextJ, val: 2 });
            }
            queue.push([nextI, nextJ]);
        }
    }

    return false;
}
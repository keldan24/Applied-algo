class PriorityQueue {
    constructor() {
      this.values = [];
    }
  
    enqueue(val, priority) {
      this.values.push({ val, priority });
      this.sort();
    }
  
    dequeue() {
      return this.values.shift();
    }
  
    sort() {
      this.values.sort((a, b) => a.priority - b.priority);
    }
  
    isEmpty() {
      return this.values.length === 0;
    }
  }
  
  function dijkstra(graph, start) {
    const distances = {};
    const pq = new PriorityQueue();
    const previous = {};
  
    for (let vertex in graph) {
      if (vertex === start) {
        distances[vertex] = 0;
        pq.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        pq.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
  
    while (!pq.isEmpty()) {
      const smallest = pq.dequeue().val;
  
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in graph[smallest]) {
          let distance = graph[smallest][neighbor];
          let candidate = distances[smallest] + distance;
  
          if (candidate < distances[neighbor]) {
            distances[neighbor] = candidate;
            previous[neighbor] = smallest;
            pq.enqueue(neighbor, candidate);
          }
        }
      }
    }
  
    return distances;
  }
  
  // Example usage:
  const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
  };
  
  console.log(dijkstra(graph, 'A'));
  
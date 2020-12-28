/* eslint-disable no-console */
export default abstract class ClusteringAlgorithm<E> {
  protected distanceMatrix: number[][];

  protected dataset: E[];

  constructor(dataset: E[]) {
    this.dataset = dataset;
    this.distanceMatrix = [];

    // initialize dataset-length squared sized distance matrix
    for (let i = 0; i < dataset.length; i += 1) {
      const row = [];
      for (let j = 0; j < dataset.length; j += 1) row.push(0);
      this.distanceMatrix.push(row);
    }

    // fill in with distance for every pair of elements in dataset
    for (let i = 0; i < dataset.length; i += 1)
      for (let j = 0; j < dataset.length; j += 1)
        if (i !== j) {
          const distance = this.computeDistance(dataset[i], dataset[j]);
          this.distanceMatrix[i][j] = distance;
          this.distanceMatrix[j][i] = distance;
        }
  }

  run(): E[][][] {
    const dendogram = [];
    let clusters = this.dataset.map((element) => [element]);

    dendogram.push(JSON.parse(JSON.stringify(clusters)));
    let clusterCount = this.dataset.length;

    console.log('Clusters initialized. Initial count: %d', clusterCount);

    do {
      // find closest pair of clusters
      let minDistanceCluster1 = clusters[0];
      let minDistanceCluster2 = clusters[1];
      let minDistance = this.computeClusterDistance(clusters[0], clusters[1]);

      for (let i = 0; i < clusters.length; i += 1)
        for (let j = 0; j < clusters.length; j += 1) {
          if (i !== j) {
            const cluster1 = clusters[i];
            const cluster2 = clusters[j];

            const distance = this.computeClusterDistance(cluster1, cluster2);

            if (distance < minDistance) {
              minDistance = distance;
              minDistanceCluster1 = cluster1;
              minDistanceCluster2 = cluster2;
            }
          }
        }

      // merge the two clusters - add new cluster, remove the 2 old ones
      const newCluster = [...minDistanceCluster1, ...minDistanceCluster2];
      clusters = [...clusters, newCluster];
      clusters = clusters.filter(
        (cluster) =>
          ![minDistanceCluster1, minDistanceCluster2].includes(cluster)
      );

      // update dendogram and cluster count
      dendogram.push(JSON.parse(JSON.stringify(clusters)));
      clusterCount -= 1;

      console.log('Clusters merged. New cluster count: %d', clusterCount);
    } while (clusterCount > 2);

    return dendogram;
  }

  abstract computeClusterDistance(cluster1: E[], cluster2: E[]): number;

  abstract computeDistance(element1: E, element2: E): number;
}

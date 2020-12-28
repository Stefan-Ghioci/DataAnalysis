/* eslint-disable no-console */
export default abstract class ClusteringAlgorithm<E> {
  protected dataset: E[];

  constructor(dataset: E[]) {
    this.dataset = dataset;
  }

  run(): E[][][] {
    const dendogram = [];
    let clusters = this.dataset.map((element) => [element]);
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
      dendogram.push([minDistanceCluster1, minDistanceCluster2]);
      clusterCount -= 1;

      console.log('Clusters merged. New cluster count: %d', clusterCount);
    } while (clusterCount > 2);

    return dendogram;
  }

  computeClusterDistance(cluster1: E[], cluster2: E[]): number {
    let maxDistance = this.computeDistance(cluster1[0], cluster2[0]);

    for (let i = 0; i < cluster1.length; i += 1)
      for (let j = 0; j < cluster2.length; j += 1) {
        const distance = this.computeDistance(cluster1[i], cluster2[j]);
        if (distance > maxDistance) {
          maxDistance = distance;
        }
      }

    return maxDistance;
  }

  abstract computeDistance(element1: E, element2: E): number;
}

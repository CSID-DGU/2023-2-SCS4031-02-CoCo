package trizzle.trizzlebackend.repository;

import trizzle.trizzlebackend.domain.ElasticReview;
import trizzle.trizzlebackend.elasticSearch.ElasticsearchRepository;

public interface ElasticReviewRepository extends ElasticsearchRepository<ElasticReview, Long> {

    void deleteById(String id);
    void save(ElasticReview elasticReview);
}

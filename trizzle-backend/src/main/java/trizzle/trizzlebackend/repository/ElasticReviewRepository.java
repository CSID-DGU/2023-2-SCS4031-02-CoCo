package trizzle.trizzlebackend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import trizzle.trizzlebackend.domain.ElasticReview;
import trizzle.trizzlebackend.elasticSearch.ElasticsearchRepository;

public interface ElasticReviewRepository extends ElasticsearchRepository<ElasticReview, Long> {

    @Query("{\"bool\": {\"should\": [{\"match\": {\"reviewTitle\": \"?0\"}}, {\"match\": {\"reviewContent\": \"?0\"}}]}}")
    Page<ElasticReview> searchByReviewTitleOrReviewContentText(String keyword, Pageable pageable);

    @Query("{\"bool\": {\"must\": [" +
            "{\"match\": {\"location\": \"?0\"}}, " +
            "{\"bool\": {\"should\": [" +
            "{\"match\": {\"reviewTitle\": \"?1\"}}, " +
            "{\"match\": {\"reviewContent\": \"?1\"}}" +
            "]}}" +
            "]}}")
    Page<ElasticReview> searchByLocationAndReviewTitleOrReviewContentText(String location, String keyword, Pageable pageable);

    void deleteById(String id);
    void save(ElasticReview elasticReview);
}

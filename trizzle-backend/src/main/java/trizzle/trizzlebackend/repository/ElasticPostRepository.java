package trizzle.trizzlebackend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Query;
import trizzle.trizzlebackend.domain.ElasticPost;
import trizzle.trizzlebackend.elasticSearch.ElasticsearchRepository;

import java.util.List;


public interface ElasticPostRepository extends ElasticsearchRepository<ElasticPost, Long> {

    @Query("{\"bool\": {\"should\": [{\"match\": {\"postTitle\": \"?0\"}}, {\"match\": {\"plan.planThema\": \"?0\"}}]}}")
    Page<ElasticPost> searchByPostTitleOrPlanContaining(String keyword, Pageable pageable);

    @Query("{\"bool\": {\"should\": [{\"match\": {\"postTitle\": \"?0\"}}, {\"match\": {\"plan.planThema\": \"?0\"}}]}}")
    Page<ElasticPost> searchByPostTitleOrPlanContainingAndPlanPlanLocation(String keyword, String location, Pageable pageable);

    Page<ElasticPost> findByPlanPlanLocation(String location, Pageable pageable);

    ElasticPost findById(String id);
    void deleteById(String id);
    void save(ElasticPost elasticPost);
}

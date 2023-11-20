package trizzle.trizzlebackend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Mapping;
import trizzle.trizzlebackend.domain.ElasticPost;
import trizzle.trizzlebackend.elasticSearch.ElasticsearchRepository;

import java.util.List;


public interface ElasticPostRepository extends ElasticsearchRepository<ElasticPost, Long> {
    Page<ElasticPost> findByPostTitle(String keyword, Pageable pageable);
    ElasticPost findById(String id);
    void deleteById(String id);
    void save(ElasticPost elasticPost);
}

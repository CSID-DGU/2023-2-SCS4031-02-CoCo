package trizzle.trizzlebackend.elasticSearch;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.elasticsearch.config.ElasticsearchConfigurationSupport;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.RefreshPolicy;
import org.springframework.data.elasticsearch.core.convert.ElasticsearchConverter;
import org.springframework.data.elasticsearch.core.convert.ElasticsearchCustomConversions;
import trizzle.trizzlebackend.converter.ElasticConverter;
import trizzle.trizzlebackend.converter.ReadElasticConverter;

import java.util.List;

public abstract class AbstractElasticsearchConfiguration extends ElasticsearchConfigurationSupport {
    @Bean
    public abstract RestHighLevelClient elasticsearchClient();

    @Bean(name = { "elasticsearchOperations", "elasticsearchTemplate" })
    public ElasticsearchOperations elasticsearchOperations(ElasticsearchConverter elasticsearchConverter,
                                                           RestHighLevelClient elasticsearchClient) {

        ElasticsearchRestTemplate template = new ElasticsearchRestTemplate(elasticsearchClient, elasticsearchConverter);
        template.setRefreshPolicy(refreshPolicy());

        return (ElasticsearchOperations) template;
    }

}

package trizzle.trizzlebackend.elasticSearch;

import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.data.elasticsearch.core.convert.ElasticsearchCustomConversions;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import trizzle.trizzlebackend.converter.ElasticConverter;
import trizzle.trizzlebackend.converter.ReadElasticConverter;

import java.util.List;

@Configuration
@EnableElasticsearchRepositories(basePackages = "trizzle.trizzlebackend.repository")
public class ElasticSearchConfig extends AbstractElasticsearchConfiguration {

    @Override
    public RestHighLevelClient elasticsearchClient() {
        ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo("localhost:9200")
                .build();
        return RestClients.create(clientConfiguration).rest();
    }

    @Override
    public ElasticsearchCustomConversions elasticsearchCustomConversions() {
        return new ElasticsearchCustomConversions(List.of(
                new ElasticConverter(),
                new ReadElasticConverter()
        ));
    };


}

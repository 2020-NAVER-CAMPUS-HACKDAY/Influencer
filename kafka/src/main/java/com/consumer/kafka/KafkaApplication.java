package com.consumer.kafka;

import org.apache.http.Header;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.apache.http.message.BasicHeader;
import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.TopicPartition;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.*;

@SpringBootApplication
public class KafkaApplication {

	private static final Logger log = LoggerFactory.getLogger(KafkaApplication.class);

	public static void main(String[] args) throws Exception{
		SpringApplication.run(KafkaApplication.class, args);
		subscribe();
	}

	private static Properties setConsumerProperty() {
		Properties configs = new Properties();

		configs.put("bootstrap.servers", "http://49.50.166.62:9092");
		configs.put("group.id", "click_log_group");
		configs.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
		configs.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
		configs.put("enable.auto.commit", "true");
		configs.put("auto.commit.interval.ms", "1000");
		configs.put("session.timeout.ms", "30000");

		return configs;
	}

	public static void subscribe() throws Exception {
		List<String> topicList = new ArrayList<>();
		topicList.add("click_log");

		KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(setConsumerProperty());
		consumer.subscribe(topicList);

		try {
			while (true) {
				ConsumerRecords<String, String> records = consumer.poll(500);


				Map<String, String> body = new HashMap<String, String>();

				for (ConsumerRecord<String, String> record : records) {
					body.put(record.key(), record.value());
					log.info("offset = " + record.offset()
							+ "\tkey =" + record.key()
							+ "\tvalue =" + record.value());

					consumer.commitAsync(new OffsetCommitCallback() {
						@Override
						public void onComplete(Map<TopicPartition, OffsetAndMetadata> offsets, Exception exception) {
						}
					});
				}

				Header[] headers = {
						new BasicHeader(HttpHeaders.CONTENT_TYPE, "application/json"),
						new BasicHeader("Role", "Create")
				};

				final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
				credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials("admin", "admin"));

				RestClient restClient = RestClient
						.builder(new HttpHost("http://49.50.172.175", 9200))
						.setDefaultHeaders(headers)
						.setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
							public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder arg0) {
								return arg0.setDefaultCredentialsProvider(credentialsProvider);
							}
						})
						.build();

				SimpleDateFormat format1 = new SimpleDateFormat( "yyyy-MM-dd");
				Date day = new Date();
				String uri = "http://49.50.172.175:9200/influencer/click-log/" + format1.format(day);

			}

		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			try {
				consumer.commitSync();
			} finally {
				consumer.close();
			}
		}
	}

}

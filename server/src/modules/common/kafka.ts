import kafka from 'kafka-node';
import { UserLog } from '../../interfaces';

export default async (_id: string, contents: UserLog) => {

  const id = new kafka.KeyedMessage('_id', _id);
  const userName = new kafka.KeyedMessage('userName', contents.userName);
  const item = new kafka.KeyedMessage('item', contents.item);

  const payloads = [{
    topic: 'click_log',
    messages: [id, userName, item],
    timestamp: Date.now(),
  }]

  const client = new kafka.KafkaClient({ kafkaHost: '49.50.166.62:9092' });
  const options = {
    requireAcks: 1,
    ackTimeoutMs: 100,
  }
  const producer = new kafka.Producer(client, options);

  producer.on('ready', () => {
    producer.send(payloads, (err: Error, data: any) => {
      if (err) console.error(err);
      console.log(data);
    })
  })

  producer.on('error', (err) => console.error(err));
};
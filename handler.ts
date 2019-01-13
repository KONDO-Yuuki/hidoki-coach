import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import fetch from "node-fetch";

function send(url: string, message: string) {
  return fetch(url, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: `{"text":"${message}","attachments": [
      {
          "fallback": "fallback string",
          "title": "達成できましたか？",
          "callback_id": "callback_id value",
          "color": "#FF0000",
          "attachment_type": "default",
          "actions": [
              {
                  "name": "btn1Name",
                  "text": "できた",
                  "type": "button",
                  "style":"default",
                  "value": "hoge"
              },
          ]
      }
    ]}`
  });
}
function generateMessage() {
  // todo レンジを正しいのにする
  const target = "UF53LCTDK";
  const ojective = "1日30分コードを書く:innocent:";
  // todo この辺のメッセージをメンテ
  return `<@${target}> \n 昨日は目標を達成できましたか？ 今日も${ojective}を続けていきましょう！`;
}

export const checker: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback
) => {
  const message = generateMessage();
  const response = await send(
    "", // ここにhogeを追加
    message
  );
  cb(null, response);
};

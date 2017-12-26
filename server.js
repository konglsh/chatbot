var express = require('express');
var app = express();

var bodyParser =require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req, res) => {
  res.status(200).send('mtovchatbot').end();
});

app.get('/keyboard', function(req, res){
  const menu = {
    "type": 'buttons',
    "buttons" : ["mtov", "내 차량 주차 위치", "주차장 검색"]
  };

  res.set({
    'content-type' : 'application/json'
  }).send(JSON.stringify(menu));
})

app.post('/message',function(req,res){
  var user_key = req.body.user_key;
  var content = req.body.content;
  var type = req.body.type;
  var text = '';
  console.log('key :' + user_key + ', content :' + content);
  //기본 인사
  if(content == 'mtov' || content == '처음으로')
  {
    res.send({
      "message" : {
        "text" : "안녕하세요 mtov 입니다.\n[내 차량 주차 위치 조회]\n[주차장 잔여석 검색]\n기능을 제공합니다."
      },
      "keyboard" : {
        "type": 'buttons',
        "buttons" : ["mtov", "내 차량 주차 위치", "주차장 검색"]
      }
    });
  }

  //차량 위치 조회
  else if(content == '내 차량 주차 위치'){
    res.send({
      "message" : {
        "text" : '현재 차량의 주차 위치가 조회되지 않습니다.'
      },

      "keyboard" : {
        "type": 'buttons',
        "buttons" : ["mtov", "내 차량 주차 위치", "주차장 검색"]
      }
    });
  }

  //잔여 주차석 조회
  else if(content == '주차장 검색'){
    res.send({
      "message" : {
        "text" : '검색을 원하는 주차장을 선택해주세요.'
      },

      "keyboard" : {
        "type": 'buttons',
        "buttons" : ["판교 스타트업캠퍼스", "처음으로"]
      }
    });
  }
  else if(content == '판교 스타트업캠퍼스'){
    res.send({
      "message" : {
        "text" : '판교 스타트업 캠퍼스 입니다.',
        "photo" : {
          "url" : "https://www.pangyotechnovalley.org/image/introduce/pic_iui_02_big.jpg",
          "width" : 640,
          "height" : 480
        },
        "message_button": {
          "label" : "자세히보기",
          "url" : "https://www.pangyotechnovalley.org/html/tenant/startup.asp"
        }
      },
      "keyboard" : {
        "type": 'buttons',
        "buttons" : ["처음으로"]
      }
    });
  }
})

app.listen(8080,function(){
  console.log("8080port server on");
});

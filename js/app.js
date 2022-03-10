let stage = new PIXI.Container({
    sortableChildren : true
});
let renderer = PIXI.autoDetectRenderer({
    width: 600,
    height: 800,
    backgroundColor: 0xAAAAAA,
    preserveDrawingBuffer: true,
});

document.getElementById("canvas").appendChild(renderer.view);

renderer.render(stage);



document.getElementById("download").onclick = function(){
    let dataurl = renderer.view.toDataURL("image/jpeg");
    let a = document.createElement("a");
    a.href = dataurl;
    a.download = "card.jpeg"
    a.click();

    console.log(dataurl);
};


let backimage_sprite = 0;
//背景画像
document.getElementById('backimage').addEventListener('change', evt => {
    // ファイルを読み取る
    files = evt.target.files;
    if (!files.length) {
        console.log('error! file are not uploaded.');
        return;
    }

    console.log(files[0]);
    //読み込んだ画像
    const image = new Image();
    const fr = new FileReader();
    // ファイルをdata urlとして読み込みます
    fr.readAsDataURL(files[0]);
    // ファイルをロードした後のイベントリスナを登録
    fr.onload = evt => {
        // base64に変換されたurlをimageのsrcに設定
        image.src = evt.target.result;
        // 画像をロードした後のイベントリスナを登録
        image.onload = () => {
            // アップロードした画像をtextureとして読み込みspriteに貼り付ける
            const backimage_texture = new PIXI.Texture(new PIXI.BaseTexture(image));
            backimage_sprite = new PIXI.Sprite(backimage_texture);
            // 位置調整
            backimage_sprite.anchor.set(0.5);
            backimage_sprite.x = 300;
            backimage_sprite.y = 400;
            
            stage.addChild(backimage_sprite);
            renderer.render(stage);

            backimage_sprite.interactive = true;

            let move_card = function(e){
                let position = e.data.getLocalPosition(stage);
                backimage_sprite.x = position.x;
                backimage_sprite.y = position.y;
                renderer.render(stage);
            }

            backimage_sprite.on('pointerdown', function(e){    
                backimage_sprite.on('pointermove', move_card);
            })
            .on('pointerup', function(e){
                backimage_sprite.off('pointermove', move_card);
            });
        
            

        };
    }

});

//背景画像の拡大率
document.getElementById("scale").onchange = function() {
    if(backimage_sprite != 0){
        backimage_sprite.scale.set(Number(document.getElementById("scale").value));
        renderer.render(stage);
    }
}


document.getElementById("create").onclick = function() {
    stage.removeChildren();

   
    // 背景画像の追加
    if(backimage_sprite != 0){
        stage.addChild(backimage_sprite);
    }
    

    //メインのカード画像
    let val = document.getElementById("images").value;
    let texture_main = new PIXI.Texture.from("./images/" + val + ".png");
    let sprite_main = new PIXI.Sprite(texture_main);
    sprite_main.anchor.set(0.5);
    sprite_main.x = sprite_main.width / 2;
    sprite_main.y = sprite_main.height / 2;
    stage.addChild(sprite_main);

     //確保力マークの画像
     let texture_attack = new PIXI.Texture.from("./images/attack.png");
     for(i = 0; i < document.getElementById("attack").value; i++){
         let sprite_attack = new PIXI.Sprite(texture_attack);
         sprite_attack.anchor.set(0.5);
         sprite_attack.x = 563 - (i * 43);
         sprite_attack.y = 113;
 
         console.log(i);
         stage.addChild(sprite_attack);
     }

    //カードタイプの文字列
    let textstyle_cardtype = new PIXI.TextStyle({
        fontFamily: ["03SmartFontUI"],
        fontSize: 25
    });

    let cardtype = new PIXI.Text(document.getElementById("cardtype").value, textstyle_cardtype);
    cardtype.anchor.set(0.0);
    cardtype.x = 40;
    cardtype.y = 530;
    stage.addChild(cardtype);


     //効果の文字列
    let effect_fontsize = Number(document.getElementById("effect_fontsize").value);//;
    let textstyle_effect = new PIXI.TextStyle({
        fontFamily: ["03SmartFontUI"],
        fontSize: effect_fontsize,
        wordWrap : true,
        wordWrapWidth : 545,
        breakWords : true
    });
    console.log(effect_fontsize);
    let effect = new PIXI.Text(document.getElementById("effect").value, textstyle_effect);
    effect.anchor.set(0.0);
    effect.x = 45;
    effect.y = 560;
    stage.addChild(effect);

    //フレーバーテキストの文字列
    let flavor_fontsize = Number(document.getElementById("flavor_fontsize").value);
    let textstyle_flavor = new PIXI.TextStyle({
        fontFamily: ["GenEi Antique v5 Medium"],
        fontSize: flavor_fontsize,
        wordWrap : true,
        wordWrapWidth : 550,
        breakWords : true
    });
    let flavor = new PIXI.Text(document.getElementById("flavor").value, textstyle_flavor);
    flavor.anchor.set(0, 1.0);
    flavor.x = 45;
    flavor.y = 710;
    stage.addChild(flavor);

    //タグの文字列
    let tag_fontsize = Number(document.getElementById("tag_fontsize").value);
    let textstyle_tag = new PIXI.TextStyle({
        fontFamily: ["03SmartFontUI"],
        fontSize: tag_fontsize,
        wordWrap : true,
        wordWrapWidth : 550,
        breakWords : true
    });
    let tag = new PIXI.Text(document.getElementById("tag").value, textstyle_tag);
    tag.anchor.set(0.0);
    tag.x = 45;
    tag.y = 718;
    stage.addChild(tag);

    //カード名の文字列
    let cardname_fontsize = Number(document.getElementById("cardname_fontsize").value);
    let textstyle_cardname = new PIXI.TextStyle({
        fontFamily: ["03SmartFontUI"],
        fontSize: cardname_fontsize,
        wordWrap : true,
        wordWrapWidth : 550,
        breakWords : true
    });
    let cardname = new PIXI.Text(document.getElementById("cardname").value, textstyle_cardname);
    cardname.anchor.set(0.5);
    cardname.x = 320;
    cardname.y = 48;
    stage.addChild(cardname);

    


    renderer.render(stage);

    console.log(val);
    
};


import { Init }      from './lib/init.js'
import { Ajax }      from './lib/ajax.js'
import { Images }    from './lib/images.js'
import { Animation } from './lib/animation.js'
import { Style }     from './lib/style.js'
import { Event }     from './lib/event.js'

export class Player{
  constructor(options){
    this.options = new Init(options).options
    this.style   = new Style()

    if(this.options.file){
      this.load_data(this.options.file)
    }
    else if(this.options.data){
      this.set_setting()
    }
  }

  // アニメーション再生の設定（外部実行用）
  action(name){
    this.options.root.setAttribute('data-action' , name)
  }

  // 設定ファイルのload処理 : json-data
  load_data(file){
    new Ajax({
      url : file,
      method : 'get',
      callback : (e =>{
        const json = e.target.response
        this.options.data = JSON.parse(json)
        this.set_setting()
      }).bind(this) 
    })
  }

  set_setting(){
    this.images    = new Images(this.options)
    this.animation = new Animation(this.options)
    this.style.add(this.animation.css)
    this.event     = new Event(this.options)
    // this.shape = new Shape(this.options)
  }
}





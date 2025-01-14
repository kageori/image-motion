import { SettingInit as Init }      from './lib/setting/init.js'
import { Ajax }      from './lib/setting/ajax.js'
import { Images }    from './lib/image/images.js'
import { Animation } from './lib/animation/animation.js'
import { Style }     from './lib/setting/style.js'
import { Event }     from './lib/event/event.js'

export class Player{
  constructor(options){
    this.css      = this.get_css()
    this.options  = new Init(options).options
    this.callback = this.options.callback || null
    this.style    = new Style(this.options , this.css)
    this.loaded_style()
  }

  loaded_style(){
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
    this.event     = new Event(this.options , this.animation)
    this.finish()
  }

  get_css(){
    const base = import.meta
    const path = base.url.replace(/player.js$/ , 'main.css')
    return path
  }

  finish(){
    // console.log(this.animation)
    if(!this.callback){return}
    this.callback(this)
  }
}






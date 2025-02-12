import { Options } from './options.js'

export class Lists{
  constructor(options){
    this.options = options
    this.uuid = this.options.uuid
    this.view_add()
    this.set_audio_tag()
    this.set_trash()
  }

  // ファイル読み込みの場合dataがセットされていないため、別データから取得する
  set_options(options){
    if(options.data){
      return options
    }
    else{
      const data = Options.sounds.find(e => e.uuid === options.uuid)
      console.log(Options.sounds.length)
      return data
    }
  }
  
  get_area(){
    return document.querySelector('.contents-sound .lists > ul')
  }

  get_template(){
    const elm = document.querySelector(`.template > [data-name='sound-list']`)
    this.options.is_use = this.is_animation_use()
    return Options.common.doubleBlancketConvert(elm.innerHTML , this.options)
  }

  get_item(){
    const area = this.get_area()
    return area.querySelector(`[data-uuid='${this.uuid}']`)
  }

  get_play(){
    const item = this.get_item()
    return item.querySelctor(`.play`)
  }

  view_add(){
    const area = this.get_area()
    const template = this.get_template()
    area.insertAdjacentHTML('beforeend' , template)
  }

  set_audio_tag(){
    const item = this.get_item()
    const player_area = item.querySelector(`.player`)
    const audio_elm = Options.elms[this.uuid]
    player_area.appendChild(audio_elm)
    audio_elm.setAttribute('controls' , '')
  }

  set_trash(){
    const item = this.get_item()
    const trash_icon = item.querySelector(`.trash > *`)
    if(!trash_icon){return}
    trash_icon.addEventListener('click' , this.trash_click.bind(this))
  }
  trash_click(e){
    if(this.is_animation_use()){
      alert('使用されているsoundデータです。（削除できません）')
      return
    }
    if(!confirm('音声データを削除してもよろしいですか？（この操作は取り消せません）')){return}
    this.del_sound_data()
    this.del_sound_list()
  }
  // アニメーションで使われている場合はtrueを返す
  is_animation_use(){
    if(!parent.main.options.animations){return}
    const animations = parent.main.options.animations
    for(let animation_name in animations){
      for(let img_uuid in animations[animation_name].items){
        for(let per in animations[animation_name].items[img_uuid].keyframes){
          const data = animations[animation_name].items[img_uuid].keyframes[per]
          if(!data.sound){continue}
          if(data.sound === this.uuid){return true}
        }
      }
    }
  }
  del_sound_data(){
    for(let i=0; i<Options.sounds.length; i++){
      if(Options.sounds[i].uuid !== this.uuid){continue}
      Options.sounds.splice(i , 1)
      break
    }
  }
  del_sound_list(){
    const elm = this.get_item()
    elm.parentNode.removeChild(elm)
  }
  



}

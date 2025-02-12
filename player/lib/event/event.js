import { Matrix }   from '../animation/matrix.js'
import { Mutation } from './mutation.js'

export class Event{
  constructor(options , animation){
    this.datas = {}
    this.options = options
    this.animation = animation
    // this.set_images()
    // this.set_sound_mutation()

    this.set_mutations()
  }

  set_mutations(){
    new Mutation(this.animation)
  }

  // set_images(){
  //   for(let data of this.options.data.images){
  //     if(data.shape_use === 1){
  //       this.set_shape_mutation(data)
  //     }
  //   }
  // }

  // is_shape(keyframes){
  //   if(!keyframes){return}
  //   for(let per in keyframes){
  //     if(keyframes[per].shape){
  //       return true
  //     }
  //   }
  // }

  // // ----------
  // // mutation
  // set_shape_mutation(data){
  //   const pic = this.options.root.querySelector(`[data-uuid='${data.uuid}']`)
  //   if(!pic){return}
  //   if(!pic.querySelector(':scope > .shape')){return}
  //   this.options.shapes[data.uuid] = {
  //     root        : this.options.root,
  //     uuid        : data.uuid,
  //     image_num   : data.num,
  //     options     : this.options,
  //     animations  : JSON.parse(JSON.stringify(this.options.data.animations)),
  //     splits      : pic.querySelectorAll(':scope > .shape > .shape-item'),
  //     base_points : JSON.parse(JSON.stringify(this.options.data.images[data.num].shape_points)),
  //   }
  //   const anim_name = this.options.root.getAttribute('data-action')
  //   new MutationObserver(((uuid , e)=>{
  //     this.update_shape_mutation(uuid , e)
  //   }).bind(this , data.uuid))
  //   .observe(this.options.root , {
  //     attributes : true, 
  //     childList  : false,
  //     subtree    : false,
  //   })
  //   this.shape_play_mutation(data.uuid , anim_name , pic)
  // }

  // update_shape_mutation(uuid , e){
  //   const root = e[0].target
  //   const anim_name = root.getAttribute('data-action')
  //   const pic = root.querySelector(`.pic[data-uuid='${uuid}']`)

  //   // shape
  //   if(anim_name && this.is_shape_animetion(uuid , anim_name)){
  //     this.shape_play_mutation(uuid , anim_name , pic)
  //   }
  //   else{
  //     this.shape_stop_mutation(uuid)
  //   }
  // }

  // is_shape_animetion(uuid , anim_name){
  //   const anim_data = this.options.shapes[uuid].animations[anim_name]
  //   if(anim_data
  //   && anim_data.items
  //   && anim_data.items[uuid]
  //   && this.is_shape(anim_data.items[uuid].keyframes)){
  //     return true
  //   }
  //   else{
  //     return false
  //   }
  // }

  // shape_play_mutation(uuid , anim_name , pic){
  //   if(!pic.querySelector(':scope > .shape')){return}
  //   if(!uuid){return}
  //   const datas     = this.options.shapes[uuid]
  //   const anim_data = datas.animations[anim_name]
  //   if(!anim_data
  //   || !anim_data.items
  //   || !anim_data.items[uuid]
  //   || !anim_data.items[uuid].keyframes){return}
  //   if(this.is_shape(anim_data.items[uuid].keyframes) !== true){return}
  //   const start                  = (+new Date())
  //   this.datas[uuid]             = anim_data
  //   this.datas[uuid].max_count   = this.get_max_count(anim_name)
  //   this.datas[uuid].current_count = 0
  //   this.datas[uuid].start       = start
  //   this.datas[uuid].per         = null
  //   this.datas[uuid].splits      = datas.splits
  //   this.datas[uuid].keyframes   = anim_data.items[uuid].keyframes
  //   this.datas[uuid].base_points = datas.base_points
  //   this.datas[uuid].duration    = this.get_duration(anim_name)
  //   this.datas[uuid].time        = this.datas[uuid].duration / 100
  //   this.shape_view_mutation(start , uuid)
  // }

  // shape_view_mutation(flg , uuid){
  //   const data = this.datas[uuid]
  //   if(!data){return}
  //   if(flg !== data.start){return}
  //   const progress = ((+new Date()) - data.start) / 1000
  //   const rate = progress / data.duration
  //   const per = Math.round(rate * 100)
  //   if(per !== data.per){
  //     data.per = per
  //     for(let num=0; num<data.splits.length; num++){
  //       const matrix_data = this.get_martix(num , uuid)
        
  //       if(!matrix_data){continue}
  //       data.splits[num].style.setProperty('transform', matrix_data.transform, '')
  //     }
  //   }
  //   if(per >= 100){
  //     data.start = (+new Date())
  //     // 回数指定がある場合は処理を停止する
  //     this.datas[uuid].current_count++
  //     if(this.datas[uuid].max_count !== null
  //     && this.datas[uuid].max_count <= this.datas[uuid].current_count){return}
  //   }
  //   setTimeout(this.shape_view_mutation.bind(this , data.start , uuid) , data.time * 1000)
  // }
  // get_martix(num , uuid){
  //   const data = this.datas[uuid]
  //   if(data.keyframes[data.per]){
  //     if(!data.keyframes[data.per].shape){return}
  //     return data.keyframes[data.per].shape.matrix[num]
  //   }
  //   else{
  //     const next_positions = this.get_shape_next_points(num , data.keyframes , data.per)
  //     if(!next_positions){return}
  //     return new Matrix(data.base_points[num] , next_positions)
  //   }
  // }

  // shape_stop_mutation(uuid){
  //   if(!this.datas[uuid]){return}
  //   for(let split of this.datas[uuid].splits){
  //     split.style.setProperty('transform','','')
  //   }
  //   delete this.datas[uuid]
  // }

  // // ----------
  // // shape animation play
  // get_shape_next_points(num , keyframes , per){
  //   const res = this.get_between_keyframes(per , keyframes)
  //   if(!res){return}
  //   if(!keyframes[res.start].shape
  //   || !keyframes[res.end].shape
  //   || !keyframes[res.start].shape.points
  //   || !keyframes[res.end].shape.points){
  //     return
  //   }
  //   // 
  //   const start_points = keyframes[res.start].shape.points
  //   const end_points   = keyframes[res.end].shape.points
  //   const points = []
  //   for(let j=0; j<start_points[num].length; j++){
  //     points.push({
  //       x : start_points[num][j].x + (end_points[num][j].x - start_points[num][j].x) * res.rate,
  //       y : start_points[num][j].y + (end_points[num][j].y - start_points[num][j].y) * res.rate,
  //     })
  //   }
  //   return points
  // }

  // get_between_keyframes(per , keyframes){
  //   const frames = this.get_shape_frames(keyframes)
  //   // keyがあるフレームの処理
  //   if(keyframes[per]){
  //     return {
  //       start : per, 
  //       end   : per,
  //       rate  : 1.0,
  //     }
  //   }
  //   // keyが無いブレームの処理
  //   for(let i=0; i<frames.length-1; i++){
  //     const current = Number(per)
  //     const before  = Number(frames[i])
  //     const after   = Number(frames[i+1])
  //     if(before < current && current < after){
  //       return {
  //         start : before, 
  //         end   : after,
  //         rate  : (current - before) / (after - before),
  //       }
  //     }
  //   }
  // }

  // // shapeのみのkey-frameをピックアップする
  // get_shape_frames(keyframes){
  //   const arr = []
  //   for(let i in keyframes){
  //     if(keyframes[i].shape === undefined){continue}
  //     arr.push(i)
  //   }
  //   return arr
  // }


  // ----------
  // Library
  get_anim_data(anim_name){
    return this.options.data.animations[anim_name]
  }

  get_duration(anim_name){
    let duration = null
    const data = this.get_anim_data(anim_name)
    if(data){
      duration = data.duration
    }
    return duration || 1
  }
  get_max_count(anim_name){
    let count = null
    const data = this.get_anim_data(anim_name)
    if(data.count !== undefined){
      const reg = /^\d+?$/.exec(data.count)
      if(reg){
        count = reg[0]
      }
    }
    return count || null
  }

  // ----------
  // Sound
  set_sound_mutation(){
    new MutationObserver(((e)=>{
      this.update_sound_mutation(e)
    }).bind(this))
    .observe(this.options.root , {
      attributes : true, 
      childList  : false,
      subtree    : false,
    })
  }

  update_sound_mutation(e){
    if(!e || !e.length){return}
    const anim_name = e[0].target.getAttribute('data-action')
    if(anim_name && this.is_sound(anim_name)){
      this.sound_play_mutation(anim_name)
    }
    else{
      this.sound_stop_all()
    }
  }

  is_sound(anim_name){
    return this.animation.sound_data.is_data(anim_name)
  }
  sound_play_mutation(anim_name){
    this.sound_stop_all()
    const duration = this.get_duration(anim_name)
    this.sound_options = {
      anim_name : anim_name,
      start     : (+new Date()),
      duration  : duration,
      per_time  : duration / 100,
      per       : null,
      max_count : this.get_max_count(anim_name),
      current_count : 0,
    }
// console.log(this.sound_options.max_count)
    this.sound_play()
  }
  sound_play(){
    const data = this.sound_options
    if(!data){return}
    const progress = ((+new Date()) - data.start) / 1000
    const rate = progress / data.duration
    const per = Math.round(rate * 100)
    // タイミングが早くて同じper(key-number)の場合は処理しない
    if(per !== data.per){
      data.per = per
      this.animation.sound_data.play(data.anim_name , per)
    }
    if(per >= 100){
      data.start = (+new Date())
      this.animation.sound_data.stop_all()
      // 回数指定がある場合は処理を停止する
      data.current_count++
      if(data.max_count !== null
      && data.max_count <= data.current_count){return}
    }
    setTimeout(this.sound_play.bind(this) , data.per_time * 1000)
  }
  sound_stop_all(){
    if(this.sound_options){
      delete this.sound_options
    }
    if(this.animation && this.animation.sound_data){
      this.animation.sound_data.stop_all()
    }
  }

}
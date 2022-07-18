import { Options }       from '../options.js'
import * as ActionCommon from './common.js'

export class Animation{
  constructor(name , uuid){
    this.uuid = uuid
    this.name = name
    this.view()
    // this.set_tools()
    this.set_event()
  }

  view(){
    // this.init_data()
    let template = Options.common.get_template('animation')
    if(!template){return}
    const cache    = Options.datas.get_data(this.uuid)
    template       = Options.common.doubleBlancketConvert(template , cache)
    const area     = Options.elements.get_animation_lists()
    area.innerHTML = template
  }
  

  hidden(){
    const target = Options.elements.get_animation_lists()
    target.textContent = ''
  }

  set_event(){
    const area   = Options.elements.get_animation_lists()

    // ranges
    const ranges = area.querySelectorAll(`input[type='range']`)
    for(let range of ranges){
      Options.event.set(
        range,
        'input',
        this.change_range.bind(this)
      )
    }

    // inputs
    const inputs = area.querySelectorAll(`input[type='text']`)
    for(let input of inputs){
      Options.event.set(
        input,
        'input',
        this.change_input.bind(this)
      )
    }
  }


  get_parent(elm){
    return Options.elements.upper_selector(elm , 'li .flex')
  }
  get_type(elm){
    return Options.elements.upper_selector(elm , 'li .flex').getAttribute('data-type')
  }
  get_value(elm){
    return Number(elm.value || 0)
  }
  set_value(elm , value , type){
    const parent  = this.get_parent(elm)
    const input   = parent.querySelector(`input[type='${type}']`)
    input.value   = value
  }

  change_range(e){
    const num = this.get_value(e.target)
    this.set_value(e.target , num , 'text')
    this.transform_img()
  }
  change_input(e){
    const num = this.get_value(e.target)
    this.set_value(e.target , num , 'range')
    this.transform_img()
  }
  change_timeline(){
    // const per = ActionCommon.get_timeline_per()
    ActionCommon.set_current_num(this.name , this.uuid)
    // this.transform_img()
    Options.play.transform_img_all()
  }

  // uuid対象のimg全体を動かす
  transform_img(){
    const pic = Options.elements.get_uuid_view(this.uuid)
    const transforms = this.get_transform_css()
    pic.style.setProperty('transform',transforms,'')
  }
  get_transform_css(){
    const area   = Options.elements.get_animation_lists()
    const inputs = area.querySelectorAll(`input[type='text']`)
    const transforms = []
    for(let input of inputs){
      const value  = input.value || 0
      switch(this.get_type(input)){
        case 'rotate':
          transforms.push(`rotate(${value}deg)`)
          break

        case 'posx':
          transforms.push(`translateX(${value}px)`)
          break

        case 'posy':
          transforms.push(`translateY(${value}px)`)
          break
      }
    }
    return transforms.join(' ')
  }

  
  

}

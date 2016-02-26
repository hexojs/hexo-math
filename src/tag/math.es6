import { AllHtmlEntities } from "html-entities";
import { MATH_MARKER } from "../consts";
const entities = new AllHtmlEntities()

export default class MathTag {
  constructor(hexo) {
    this.hexo = hexo;
  }
  register() {
    let { tag } = this.hexo.extend;
    tag.register("math", this._transform.bind(this), { ends: true });
  }
  _transform(args, content) {
    content = entities.encode(content);
    let multiLine = /\n/.test(content);

    return multiLine ? `<span>$$${content}$$</span>${MATH_MARKER}`
                     : `<span>$${content}$</span>${MATH_MARKER}`;
  }
}

import _ from "underscore";
import { TEMPLATE, DEFAULT_OPTS } from "./consts";


const t = _.template(TEMPLATE);

export default class Script {
  constructor(hexo) {
    this.hexo = hexo;
  }
  get src() {
    let { config } = this.hexo,
      opts = _.defaults({}, config.mathjax, DEFAULT_OPTS);
    return t(opts);
  }
}

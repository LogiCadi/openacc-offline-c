import Const from "@/lib/js/const";
import Base from "@/lib/js/base"
import Inner from "@/lib/js/inner";
import Compat from "@/lib/js/compat"
import Request from "@/lib/js/request"

// 新增正则校验
import Valitate from "@/lib/js/validate"

export default {
	...Const,
	...Base,
	...Inner,
	...Compat,
	...Request,
	...Valitate
}
import Const from "@/lib/js/const";
import BaseFunc from "@/lib/js/base_func"
import Func from "@/lib/js/func";
import ExtFunc from "@/lib/js/ext_func"
import Request from "@/lib/js/request"

// 新增正则校验
import Valitate from "@/lib/js/validate"

export default {
	...Const,
	...BaseFunc,
	...Func,
	...ExtFunc,
	...Request,
	...Valitate
}
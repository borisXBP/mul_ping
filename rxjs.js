/** @format */

const Rx = require('rxjs');

// 1、创建操作符 =================================
{
	// 1.1 时间创建 -----------------------
	const { timer, interval } = Rx;
	timer(1000).subscribe(i => console.log('time'));

	// 1.2 事件创建 -----------------------
	const { of, from, fromEvent, fromEventPattern } = Rx;

	of(1, 3, 4).subscribe(i => {
		console.log(i);
	});

	from([1, 3, 4]).subscribe(i => console.log(i));

	// 1.3 网络请求创建 -----------------------
	{
		const { ajax, fromFetch, webSocket } = Rx;
	}
}

// 2、转换操作符 =================================
{
	const { mapTo } = Rx;
}

// 3、过滤操作符 =================================
{
	const {} = Rx;
}

// 4、组合操作符 =================================
{
	const {} = Rx;
}

// 5、多播操作符 =================================
{
	const {} = Rx;
}

// 6、错误处理操作符 =================================
{
	const {} = Rx;
}

// 7、工具操作符 =================================
{
	const {} = Rx;
}

// 8、条件和布尔操作符 =================================
{
	const {} = Rx;
}

// 9、数学和聚合操作符 =================================
{
	const {} = Rx;
}
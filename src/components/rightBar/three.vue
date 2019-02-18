<template>
    <div class="content">
        <h1>变量的解构赋值</h1>
        <div class="sideSonBar">
            <ul>
                <li>
                    <router-link to="/three#three1">1.数组的解构赋值</router-link>
                </li>
                <li>
                    <router-link to="/three#three2">2.对象的解构赋值</router-link>
                </li>
                <li>
                    <router-link to="/three#three3">3.字符串的解构赋值</router-link>
                </li>
                <li>
                    <router-link to="/three#three4">4.数值和布尔值的解构赋值</router-link>
                </li>
                <li>
                    <router-link to="/three#three5">5.函数参数的解构赋值</router-link>
                </li>
                <li>
                    <router-link to="/three#three6">6.圆括号问题</router-link>
                </li>
                <li>
                    <router-link to="/three#three7">7.用途</router-link>
                </li>
            </ul>    
        </div>
        <div class="mainContent">
            <ul>
                <li id="three1">
                    <h3>1.数组的解构赋值</h3>
                    <div class="mainBox">
                        <ul class="baseList">
                            <li>
                                <h4>基本用法</h4>
                                <p>
                                    ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
                                </p>
                                <p>以前，为变量赋值，只能直接指定值。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
</code></pre>
                                <p>ES6 允许写成下面这样。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
                                <p>上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。</p>
                                <p>
                                    本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">[</span>foo<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>bar<span class="token punctuation">]</span><span class="token punctuation">,</span> baz<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
foo<span class="token comment" spellcheck="true"> // 1
</span>bar<span class="token comment" spellcheck="true"> // 2
</span>baz<span class="token comment" spellcheck="true"> // 3
</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span> <span class="token punctuation">,</span> <span class="token punctuation">,</span> third<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"foo"</span><span class="token punctuation">,</span> <span class="token string">"bar"</span><span class="token punctuation">,</span> <span class="token string">"baz"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
third<span class="token comment" spellcheck="true"> // "baz"
</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> <span class="token punctuation">,</span> y<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // 1
</span>y<span class="token comment" spellcheck="true"> // 3
</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>head<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>tail<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
head<span class="token comment" spellcheck="true"> // 1
</span>tail<span class="token comment" spellcheck="true"> // [2, 3, 4]
</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>z<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // "a"
</span>y<span class="token comment" spellcheck="true"> // undefined
</span>z<span class="token comment" spellcheck="true"> // []
</span></code></pre>
                                <p>
                                    如果解构不成功，变量的值就等于<code>undefined</code>。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">[</span>foo<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>bar<span class="token punctuation">,</span> foo<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
                                <p>
                                    以上两种情况都属于解构不成功，<code>foo</code>的值都会等于<code>undefined</code>。
                                </p>
                                <p>
                                    另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // 1
</span>y<span class="token comment" spellcheck="true"> // 2
</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> <span class="token punctuation">[</span>b<span class="token punctuation">]</span><span class="token punctuation">,</span> d<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
a<span class="token comment" spellcheck="true"> // 1
</span>b<span class="token comment" spellcheck="true"> // 2
</span>d<span class="token comment" spellcheck="true"> // 4
</span></code></pre>
                                <p>上面两个例子，都属于不完全解构，但是可以成功。</p>
                                <p>
                                    如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 报错
</span><span class="token keyword">let</span> <span class="token punctuation">[</span>foo<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>foo<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>foo<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">NaN</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>foo<span class="token punctuation">]</span> <span class="token operator">=</span> undefined<span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>foo<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>foo<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                                <p>
                                    上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。
                                </p>
                                <p>对于 Set 结构，也可以使用数组的解构赋值。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // "a"
</span></code></pre>
                                <p>
                                    事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">fibs<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    yield a<span class="token punctuation">;</span>
    <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>b<span class="token punctuation">,</span> a <span class="token operator">+</span> b<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> <span class="token punctuation">[</span>first<span class="token punctuation">,</span> second<span class="token punctuation">,</span> third<span class="token punctuation">,</span> fourth<span class="token punctuation">,</span> fifth<span class="token punctuation">,</span> sixth<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">fibs<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sixth<span class="token comment" spellcheck="true"> // 5
</span></code></pre>
                                <p>
                                    上面代码中，<code>fibs</code>是一个 Generator 函数（参见《Generator 函数》一章），原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
                                </p>

                            </li>
                            <li>
                                <h4>默认值</h4>
                                <p>解构赋值允许指定默认值。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">[</span>foo <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
foo<span class="token comment" spellcheck="true"> // true
</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token string">'b'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // x='a', y='b'
</span><span class="token keyword">let</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token string">'b'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> undefined<span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // x='a', y='b'
</span></code></pre>
                                <p>
                                    注意，ES6 内部使用严格相等运算符（<code>===</code>），判断一个位置是否有值。所以，只有当一个数组成员严格等于<code>undefined</code>，默认值才会生效。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">[</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>undefined<span class="token punctuation">]</span><span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // 1
</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">null</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // null
</span></code></pre>
                                <p>
                                    上面代码中，如果一个数组成员是<code>null</code>，默认值就不会生效，因为<code>null</code>不严格等于<code>undefined</code>。
                                </p>
                                <p>
                                    如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'aaa'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> <span class="token punctuation">[</span>x <span class="token operator">=</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
                                <p>
                                    上面代码中，因为<code>x</code>能取到值，所以函数<code>f</code>根本不会执行。上面的代码其实等价于下面的代码。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> x<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> undefined<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  x <span class="token operator">=</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  x <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                                <p>默认值可以引用解构赋值的其他变量，但该变量必须已经声明。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">[</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> y <span class="token operator">=</span> x<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment" spellcheck="true"> // x=1; y=1
</span><span class="token keyword">let</span> <span class="token punctuation">[</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> y <span class="token operator">=</span> x<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>   <span class="token comment" spellcheck="true"> // x=2; y=2
</span><span class="token keyword">let</span> <span class="token punctuation">[</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> y <span class="token operator">=</span> x<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // x=1; y=2
</span><span class="token keyword">let</span> <span class="token punctuation">[</span>x <span class="token operator">=</span> y<span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment" spellcheck="true"> // ReferenceError: y is not defined
</span></code></pre>
                                <p>
                                    上面最后一个表达式之所以会报错，是因为<code>x</code>用<code>y</code>做默认值时，<code>y</code>还没有声明。
                                </p>
                            </li>
                        </ul>
                    </div>
                </li>
                <li id="three2">
                    <h3>2.对象的解构赋值</h3>
                    <div class="mainBox">
                        <p>解构不仅可以用于数组，还可以用于对象。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> <span class="token string">"aaa"</span><span class="token punctuation">,</span> bar<span class="token punctuation">:</span> <span class="token string">"bbb"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
foo<span class="token comment" spellcheck="true"> // "aaa"
</span>bar<span class="token comment" spellcheck="true"> // "bbb"
</span></code></pre>
                        <p>
                            对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">{</span> bar<span class="token punctuation">,</span> foo <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> <span class="token string">"aaa"</span><span class="token punctuation">,</span> bar<span class="token punctuation">:</span> <span class="token string">"bbb"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
foo<span class="token comment" spellcheck="true"> // "aaa"
</span>bar<span class="token comment" spellcheck="true"> // "bbb"
</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span> baz <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> <span class="token string">"aaa"</span><span class="token punctuation">,</span> bar<span class="token punctuation">:</span> <span class="token string">"bbb"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
baz<span class="token comment" spellcheck="true"> // undefined
</span></code></pre>
                        <p>
                            上面代码的第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等于<code>undefined</code>。
                        </p>
                        <p>如果变量名与属性名不一致，必须写成下面这样。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> baz <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> <span class="token string">'aaa'</span><span class="token punctuation">,</span> bar<span class="token punctuation">:</span> <span class="token string">'bbb'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
baz<span class="token comment" spellcheck="true"> // "aaa"
</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> first<span class="token punctuation">:</span> <span class="token string">'hello'</span><span class="token punctuation">,</span> last<span class="token punctuation">:</span> <span class="token string">'world'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span> first<span class="token punctuation">:</span> f<span class="token punctuation">,</span> last<span class="token punctuation">:</span> l <span class="token punctuation">}</span> <span class="token operator">=</span> obj<span class="token punctuation">;</span>
f<span class="token comment" spellcheck="true"> // 'hello'
</span>l<span class="token comment" spellcheck="true"> // 'world'
</span></code></pre>
                        <p>这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> foo<span class="token punctuation">,</span> bar<span class="token punctuation">:</span> bar <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> <span class="token string">"aaa"</span><span class="token punctuation">,</span> bar<span class="token punctuation">:</span> <span class="token string">"bbb"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> baz <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> <span class="token string">"aaa"</span><span class="token punctuation">,</span> bar<span class="token punctuation">:</span> <span class="token string">"bbb"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
baz<span class="token comment" spellcheck="true"> // "aaa"
</span>foo<span class="token comment" spellcheck="true"> // error: foo is not defined
</span></code></pre>
                        <p>
                            上面代码中，<code>foo</code>是匹配的模式，<code>baz</code>才是变量。真正被赋值的是变量<code>baz</code>，而不是模式<code>foo</code>。
                        </p>
                        <p>与数组一样，解构也可以用于嵌套结构的对象。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  p<span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token string">'Hello'</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> y<span class="token punctuation">:</span> <span class="token string">'World'</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">{</span> p<span class="token punctuation">:</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> <span class="token punctuation">{</span> y <span class="token punctuation">}</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token operator">=</span> obj<span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // "Hello"
</span>y<span class="token comment" spellcheck="true"> // "World"
</span></code></pre>
                        <p>
                            注意，这时<code>p</code>是模式，不是变量，因此不会被赋值。如果<code>p</code>也要作为变量赋值，可以写成下面这样。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  p<span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token string">'Hello'</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> y<span class="token punctuation">:</span> <span class="token string">'World'</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">{</span> p<span class="token punctuation">,</span> p<span class="token punctuation">:</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> <span class="token punctuation">{</span> y <span class="token punctuation">}</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token operator">=</span> obj<span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // "Hello"
</span>y<span class="token comment" spellcheck="true"> // "World"
</span>p<span class="token comment" spellcheck="true"> // ["Hello", {y: "World"}]
</span></code></pre>
                        <p>下面是另一个例子。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">const node <span class="token operator">=</span> <span class="token punctuation">{</span>
  loc<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    start<span class="token punctuation">:</span> <span class="token punctuation">{</span>
      line<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      column<span class="token punctuation">:</span> <span class="token number">5</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">{</span> loc<span class="token punctuation">,</span> loc<span class="token punctuation">:</span> <span class="token punctuation">{</span> start <span class="token punctuation">}</span><span class="token punctuation">,</span> loc<span class="token punctuation">:</span> <span class="token punctuation">{</span> start<span class="token punctuation">:</span> <span class="token punctuation">{</span> line <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token operator">=</span> node<span class="token punctuation">;</span>
line<span class="token comment" spellcheck="true"> // 1
</span>loc <span class="token comment" spellcheck="true"> // Object {start: Object}
</span>start<span class="token comment" spellcheck="true"> // Object {line: 1, column: 5}
</span></code></pre>
                        <p>
                            上面代码有三次解构赋值，分别是对<code>loc</code>、<code>start</code>、<code>line</code>三个属性的解构赋值。注意，最后一次对<code>line</code>属性的解构赋值之中，只有<code>line</code>是变量，<code>loc</code>和<code>start</code>都是模式，不是变量。
                        </p>
                        <p>下面是嵌套赋值的例子。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token punctuation">(</span><span class="token punctuation">{</span> foo<span class="token punctuation">:</span> obj<span class="token punctuation">.</span>prop<span class="token punctuation">,</span> bar<span class="token punctuation">:</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> <span class="token number">123</span><span class="token punctuation">,</span> bar<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

obj<span class="token comment" spellcheck="true"> // {prop:123}
</span>arr<span class="token comment" spellcheck="true"> // [true]
</span></code></pre>
                        <p>对象的解构也可以指定默认值。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> <span class="token punctuation">{</span>x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // 3
</span>
<span class="token keyword">var</span> <span class="token punctuation">{</span>x<span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // 1
</span>y<span class="token comment" spellcheck="true"> // 5
</span>
<span class="token keyword">var</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> y <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
y<span class="token comment" spellcheck="true"> // 3
</span>
<span class="token keyword">var</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> y <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
y<span class="token comment" spellcheck="true"> // 5
</span>
<span class="token keyword">var</span> <span class="token punctuation">{</span> message<span class="token punctuation">:</span> msg <span class="token operator">=</span> <span class="token string">'Something went wrong'</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
msg<span class="token comment" spellcheck="true"> // "Something went wrong"
</span></code></pre>
                        <p>
                            默认值生效的条件是，对象的属性值严格等于<code>undefined</code>。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> <span class="token punctuation">{</span>x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> undefined<span class="token punctuation">}</span><span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // 3
</span>
<span class="token keyword">var</span> <span class="token punctuation">{</span>x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
x<span class="token comment" spellcheck="true"> // null
</span></code></pre>
                        <p>
                            上面代码中，属性<code>x</code>等于<code>null</code>，因为<code>null</code>与<code>undefined</code>不严格相等，所以是个有效的赋值，导致默认值<code>3</code>不会生效。
                        </p>
                        <p>
                            如果解构失败，变量的值等于<code>undefined</code>。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">{</span>foo<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>bar<span class="token punctuation">:</span> <span class="token string">'baz'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
foo<span class="token comment" spellcheck="true"> // undefined
</span></code></pre>
                        <p>
                            如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 报错
</span><span class="token keyword">let</span> <span class="token punctuation">{</span>foo<span class="token punctuation">:</span> <span class="token punctuation">{</span>bar<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>baz<span class="token punctuation">:</span> <span class="token string">'baz'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            上面代码中，等号左边对象的<code>foo</code>属性，对应一个子对象。该子对象的<code>bar</code>属性，解构时会报错。原因很简单，因为<code>foo</code>这时等于<code>undefined</code>，再取子属性就会报错，请看下面的代码。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> _tmp <span class="token operator">=</span> <span class="token punctuation">{</span>baz<span class="token punctuation">:</span> <span class="token string">'baz'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
_tmp<span class="token punctuation">.</span>foo<span class="token punctuation">.</span>bar<span class="token comment" spellcheck="true"> // 报错
</span></code></pre>
                        <p>如果要将一个已经声明的变量用于解构赋值，必须非常小心。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 错误的写法
</span><span class="token keyword">let</span> x<span class="token punctuation">;</span>
<span class="token punctuation">{</span>x<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// SyntaxError: syntax error
</span></code></pre>
                        <p>
                            上面代码的写法会报错，因为 JavaScript 引擎会将<code>{x}</code>理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 正确的写法
</span><span class="token keyword">let</span> x<span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token punctuation">{</span>x<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。关于圆括号与解构赋值的关系，参见下文。
                        </p>
                        <p>
                            解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token string">'abc'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>上面的表达式虽然毫无意义，但是语法是合法的，可以执行。</p>
                        <p>
                            对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">{</span> log<span class="token punctuation">,</span> sin<span class="token punctuation">,</span> cos <span class="token punctuation">}</span> <span class="token operator">=</span> Math<span class="token punctuation">;</span>
</code></pre>
                        <p>
                            上面代码将<code>Math</code>对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。
                        </p>
                        <p>由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span><span class="token number">0</span> <span class="token punctuation">:</span> first<span class="token punctuation">,</span> <span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">:</span> last<span class="token punctuation">}</span> <span class="token operator">=</span> arr<span class="token punctuation">;</span>
first<span class="token comment" spellcheck="true"> // 1
</span>last<span class="token comment" spellcheck="true"> // 3
</span></code></pre>
                        <p>
                            上面代码对数组进行对象解构。数组<code>arr</code>的<code>0</code>键对应的值是<code>1</code>，<code>[arr.length - 1]</code>就是<code>2</code>键，对应的值是<code>3</code>。方括号这种写法，属于“属性名表达式”（参见《对象的扩展》一章）。
                        </p>
                    </div>
                </li>
                <li id="three3">
                    <h3>3.字符串的解构赋值</h3>
                    <div class="mainBox">
                        <p>
                            字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">const <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">,</span> e<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
a<span class="token comment" spellcheck="true"> // "h"
</span>b<span class="token comment" spellcheck="true"> // "e"
</span>c<span class="token comment" spellcheck="true"> // "l"
</span>d<span class="token comment" spellcheck="true"> // "l"
</span>e<span class="token comment" spellcheck="true"> // "o"
</span></code></pre>
                        <p>
                            类似数组的对象都有一个<code>length</code>属性，因此还可以对这个属性解构赋值。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">{</span>length <span class="token punctuation">:</span> len<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
len<span class="token comment" spellcheck="true"> // 5
</span></code></pre>
                    </div>
                </li>
                <li id="three4">
                    <h3>4.数值和布尔值的解构赋值</h3>
                    <div class="mainBox">
                        <p>解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">{</span>toString<span class="token punctuation">:</span> s<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
s <span class="token operator">===</span> Number<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token comment" spellcheck="true"> // true
</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span>toString<span class="token punctuation">:</span> s<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
s <span class="token operator">===</span> Boolean<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token comment" spellcheck="true"> // true
</span></code></pre>
                        <p>
                            上面代码中，数值和布尔值的包装对象都有<code>toString</code>属性，因此变量<code>s</code>都能取到值。
                        </p>
                        <p>
                            解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于<code>undefined</code>和<code>null</code>无法转为对象，所以对它们进行解构赋值，都会报错。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> <span class="token punctuation">{</span> prop<span class="token punctuation">:</span> x <span class="token punctuation">}</span> <span class="token operator">=</span> undefined<span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // TypeError
</span><span class="token keyword">let</span> <span class="token punctuation">{</span> prop<span class="token punctuation">:</span> y <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // TypeError
</span></code></pre>

                    </div>
                </li>
                <li id="three5">
                    <h3>5.函数参数的解构赋值</h3>
                    <div class="mainBox">
                        <p>函数的参数也可以使用解构赋值。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">add<span class="token punctuation">(</span></span><span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">add<span class="token punctuation">(</span></span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // 3
</span></code></pre>
                        <p>
                            上面代码中，函数<code>add</code>的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量<code>x</code>和<code>y</code>。对于函数内部的代码来说，它们能感受到的参数就是<code>x</code>和<code>y</code>。
                        </p>
                        <p>下面是另一个例子。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map<span class="token punctuation">(</span></span><span class="token punctuation">(</span><span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// [ 3, 7 ]
</span></code></pre>
                        <p>函数参数的解构也可以使用默认值。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">move<span class="token punctuation">(</span></span><span class="token punctuation">{</span>x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">move<span class="token punctuation">(</span></span><span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [3, 8]
</span><span class="token function">move<span class="token punctuation">(</span></span><span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [3, 0]
</span><span class="token function">move<span class="token punctuation">(</span></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [0, 0]
</span><span class="token function">move<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [0, 0]
</span></code></pre>
                        <p>
                            上面代码中，函数<code>move</code>的参数是一个对象，通过对这个对象进行解构，得到变量<code>x</code>和<code>y</code>的值。如果解构失败，<code>x</code>和<code>y</code>等于默认值。
                        </p>
                        <p>注意，下面的写法会得到不一样的结果。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">move<span class="token punctuation">(</span></span><span class="token punctuation">{</span>x<span class="token punctuation">,</span> y<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">move<span class="token punctuation">(</span></span><span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [3, 8]
</span><span class="token function">move<span class="token punctuation">(</span></span><span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [3, undefined]
</span><span class="token function">move<span class="token punctuation">(</span></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [undefined, undefined]
</span><span class="token function">move<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [0, 0]
</span></code></pre>
                        <p>上面代码是为函数<code>move</code>的参数指定默认值，而不是为变量<code>x</code>和<code>y</code>指定默认值，所以会得到与前一种写法不同的结果。</p>
                        <p><code>undefined</code>就会触发函数参数的默认值。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> undefined<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map<span class="token punctuation">(</span></span><span class="token punctuation">(</span>x <span class="token operator">=</span> <span class="token string">'yes'</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// [ 1, 'yes', 3 ]
</span></code></pre>
                    </div>
                </li>
                <li id="three6">
                    <h3>6.圆括号问题</h3>
                    <div class="mainBox">
                        <p>
                            解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。
                        </p>
                        <p>
                            由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
                        </p>
                        <p>
                            但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。
                        </p>
                        <ul class="baseList">
                            <li>
                                <h4>不能使用圆括号的情况</h4>
                                <p>以下三种解构赋值不得使用圆括号。</p>
                                <p>（1）变量声明语句</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 全部报错
</span><span class="token keyword">let</span> <span class="token punctuation">[</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>x<span class="token punctuation">:</span> c<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> c<span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span> c<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">{</span> o<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> p<span class="token punctuation">:</span> p <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> o<span class="token punctuation">:</span> <span class="token punctuation">{</span> p<span class="token punctuation">:</span> <span class="token number">2</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                                <p>
                                    上面 6 个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。
                                </p>
                                <p>（2）函数参数</p>
                                <p>
                                    函数参数也属于变量声明，因此不能带有圆括号。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 报错
</span><span class="token keyword">function</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">[</span><span class="token punctuation">(</span>z<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> z<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token comment" spellcheck="true">
// 报错
</span><span class="token keyword">function</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">[</span>z<span class="token punctuation">,</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre>
                                <p>（3）赋值语句的模式</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 全部报错
</span><span class="token punctuation">(</span><span class="token punctuation">{</span> p<span class="token punctuation">:</span> a <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span> p<span class="token punctuation">:</span> <span class="token number">42</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token punctuation">[</span>a<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
                                <p>上面代码将整个模式放在圆括号之中，导致报错。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 报错
</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">{</span> p<span class="token punctuation">:</span> a <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x<span class="token punctuation">:</span> c <span class="token punctuation">}</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
                                <p>上面代码将一部分模式放在圆括号之中，导致报错。</p>

                            </li>
                            <li>
                                <h4>可以使用圆括号的情况</h4>
                                <p>可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token punctuation">[</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // 正确
</span><span class="token punctuation">(</span><span class="token punctuation">{</span> p<span class="token punctuation">:</span> <span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // 正确
</span><span class="token punctuation">[</span><span class="token punctuation">(</span>parseInt<span class="token punctuation">.</span>prop<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // 正确
</span></code></pre>
                                <p>
                                    上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是<code>p</code>，而不是<code>d</code>；第三行语句与第一行语句的性质一致。
                                </p>

                            </li>
                        </ul>

                    </div>
                </li>
                <li id="three7">
                    <h3>7.用途</h3>
                    <div class="mainBox">
                        <p>变量的解构赋值用途很多。</p>
                        <p><strong>（1）交换变量的值</strong></p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> y <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>y<span class="token punctuation">,</span> x<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            上面代码交换变量<code>x</code>和<code>y</code>的值，这样的写法不仅简洁，而且易读，语义非常清晰。
                        </p>
                        <p>
                            <strong>（2）从函数返回多个值</strong>
                        </p>
                        <p>
                            函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 返回一个数组
</span>
<span class="token keyword">function</span> <span class="token function">example<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">example<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 返回一个对象
</span>
<span class="token keyword">function</span> <span class="token function">example<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    foo<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    bar<span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">example<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            <strong>（3）函数参数的定义</strong>
                        </p>
                        <p>
                            解构赋值可以方便地将一组参数与变量名对应起来。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 参数是一组有次序的值
</span><span class="token keyword">function</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">[</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
<span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 参数是一组无次序的值
</span><span class="token keyword">function</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">{</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
<span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">{</span>z<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span> x<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            <strong>（4）提取 JSON 数据</strong>
                        </p>
                        <p>解构赋值对提取 JSON 对象中的数据，尤其有用。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> jsonData <span class="token operator">=</span> <span class="token punctuation">{</span>
  id<span class="token punctuation">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
  status<span class="token punctuation">:</span> <span class="token string">"OK"</span><span class="token punctuation">,</span>
  data<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">867</span><span class="token punctuation">,</span> <span class="token number">5309</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">{</span> id<span class="token punctuation">,</span> status<span class="token punctuation">,</span> data<span class="token punctuation">:</span> number <span class="token punctuation">}</span> <span class="token operator">=</span> jsonData<span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span>id<span class="token punctuation">,</span> status<span class="token punctuation">,</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// 42, "OK", [867, 5309]
</span></code></pre>
                        <p>上面代码可以快速提取 JSON 数据的值。</p>
                        <p>
                            <strong>（5）函数参数的默认值</strong>
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">jQuery<span class="token punctuation">.</span>ajax <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  async <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  beforeSend <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  cache <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  complete <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  crossDomain <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  global <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
 <span class="token comment" spellcheck="true"> // ... more config
</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment" spellcheck="true"> // ... do stuff
</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            指定参数的默认值，就避免了在函数体内部再写<code>var foo = config.foo || 'default foo';</code>这样的语句。
                        </p>
                        <p>
                            <strong>（6）遍历 Map 结构</strong>
                        </p>
                        <p>
                            任何部署了 Iterator 接口的对象，都可以用<code>for...of</code>循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">const map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
map<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token string">'first'</span><span class="token punctuation">,</span> <span class="token string">'hello'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
map<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token string">'second'</span><span class="token punctuation">,</span> <span class="token string">'world'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">[</span>key<span class="token punctuation">,</span> value<span class="token punctuation">]</span> of map<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span>key <span class="token operator">+</span> <span class="token string">" is "</span> <span class="token operator">+</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token comment" spellcheck="true">
// first is hello
</span><span class="token comment" spellcheck="true">// second is world
</span></code></pre>
                        <p>如果只想获取键名，或者只想获取键值，可以写成下面这样。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 获取键名
</span><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">[</span>key<span class="token punctuation">]</span> of map<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment" spellcheck="true"> // ...
</span><span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// 获取键值
</span><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">[</span><span class="token punctuation">,</span>value<span class="token punctuation">]</span> of map<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment" spellcheck="true"> // ...
</span><span class="token punctuation">}</span>
</code></pre>
                        <p>
                            <strong>（7）输入模块的指定方法</strong>
                        </p>
                        <p>
                            加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">const <span class="token punctuation">{</span> SourceMapConsumer<span class="token punctuation">,</span> SourceNode <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">"source-map"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        
                    </div>
                </li>
                <li></li>
            </ul>
        </div>  
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
@import url('../../less/common.less'); 
</style>
// Lex-time

/*
The first phase of a standard language compiler is called lexing (aka, tokenzing). If you recall, the lexing process examines
a string of source code characters and assigns semantic meaning to the tokens as a result of some stateful parsing. 

Lexical scope is scope that is defined at lexing time, In other words, lexical scope is based on where variables and blocks of scope are authored, 
by you, at write time, and thus is mostly set in stone by the time the lexer processes your code. 

Consider this block of code
*/

function foo(a) { // Scope 1

	var b = a * 2; // Scope 2

	function bar(c) { 
		console.log( a, b, c ); // Scope 3
	}

	bar(b * 3);
}

foo( 2 ); // 2 4 12

/*
There are 3 nested scopes in this code example

Scope 1 encompasses the global scope, and has just one identifier in it "foo".
Scope 2 encompasses the scope of foo, which includes the three identifiers a, bar, and b.
Scope 3 encompasses the scope of bar, and it includes just one identifier "c"

*/

// Look-ups
/*   
In the above snipper, the Engine executes the consoe.log(...) statement and goes looking for three referenced varaibesl a, b, and c. It first starts with the 
innermost scope, the scope of "bar(...)" function. It won't find a there, so it goes up one level, out the the next nearest scope, the scope of foo(...). Its
finds "a" there, and so it uses that "a". Same thing for "b". But "c", it does find inside of bar(...).

Scope look-up stops once it finds the first match. The same identifier name can be specified at multiple layers of nexted scope,
which is called "shadowing". Regardles of shadowing, scope look-up always starts at the inntermost scope being executed at the time, and works its
way outward/upward until the first match, and stops.

Note: Global variables are also automatically properties of the global object "window". So it is poosible to reference a global variable not directly by its lexical name,
but instead directly as a property reference of the global object "window.a".

This technique gives access to a global varibale which would otherwise be inaccesible due to it being shadowed. 
*/


//Review

/*
Lexical scope means that scope is defined by author-time decisions of where functions are declared. The lexing phase of compilation is essentially able to know where and how all identifiers
are declared, and thus predict how they will be looked-up during execution.

The two mechanisms in JavaScript that can cheat lexical scope is "eval(...)" and "with". The former can modify existing lexical scope (at runtime) by evaluating a string of "code" which 
has one or more declarations in it. The latter essentially creates a whole new lexical scope (again, at runtime) by treating an object reference as a "scope" and 
that object's properties as scoped identifiers. Dont ever use either of these options.....ever!

The downside to these mechanisms is that it defeats the Engine's ability to perform compile-time optimizations regarding scope look-up, because the Engine has to assume 
pessimistically that such optimizations will be invalid. Code will run slower as a result of using either feature. Don't use them.
*/


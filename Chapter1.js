// How would the engine and friends handle this one statement below?
var a = 2;

/*
Step 1 - Compiler would see the statement and see if variable "a" already exists for that particular scope collection
If so the compiler would ignore this declaration and just move on. If not the Compiler asks Scope to declare a new variable
called "a" for that scope collection

Step 2 - Next the compiler will then produce code for the Engine to execute the assignment a = 2. The code Engine will ask Scope if there is a 
variable called "a" that is accessinble in the current scope collection. If it is, the Engine uses that variable. If not, the Engine will look elsewhere.

If Engine finds a variable, it assigns the value 2 to it. If not the Engine will throw out an error.

To summarize the, the Compiler first declares a variable and second when executing, Engine looks up the variable in Scope and assigns to it if found. 
*/

/*
Compiler Speak

When the Engine executes the code that Compiler produced for step 2, it has to look-up the variable "a" to see if it was declared. This loop-up is consulting Scope. 
The type of look-up the Engine performs affects the outcome of the look-up.

In this case the Engine would be performing an "LHS" look-up for the variable "a". The other type of look-up is called "RHS?"

An "LHS" look-up is done when a variable appears on the left-hand side of an assignment operation, and an RHS look-up us done when a variable appears 
on the right-hand side of an assignment operation.

An RHS look-up is indistinguishable, for our purpose, from simply a look-up of the value of some variable. Whereas the LHS look-up is trying to find the variable container itself, so that it can assign.
Basically RHS doesnt really mean "right-hand side of an assignment", it more accurately means "not left-hand side".

RHS instea means "retirieve his/her value", implying that RHS means "go get the value of ".


Example - console.log( a );

The reference to "a" is an RHS reference, because nothing is being assigned to a here. Instead, we're looking-up to retrieve the value of "a",
so that the value can be passed to console.log().

By contrast "a=2";

The regerence to "a" here is a LHS reference, because we don't actually care what the current value is, we simply want to find the variable as a target for the "=2" assignment opertation.

Note - Its important to note that LHS and RHS doesn't necessarily mean left/right side of the "=" assignment operatior. There are several ways that assignments happen,
and so its better to conceptually think about it as "who's the target of the assignment (LHS) and who is the source of the assignment (RHS)".

Consider the following program
*/

function foo(a) {
  console.log(a); //2
}

foo(2);

/* 
The last line that invokes foo(...) as a function call requires an RHS reference to "foo", meaning. Go look-up the value of "foo" and give it to me. Moreover, (...) means the value of "foo"
should be executed, so it'd better actually be a function.

Can you tell where the assignment is happening?

You may have missed the implied a = 2 in the function food. It happens when the value of "2" is passed as an argument to the foo(...) function, in which case the 
"2" value is assigned to the parameter "a". To implicitly assing to paramter "a", an LHS look-up is performed.


There is also an RHS reference for the value "a", and that resulting value is passed to the console.log(...). The console.log needs a reference to execute. In this case its an
RHS look-up for the console object, then a property-resolution occurs to see if it has a method called log. 

Lastly we can conceptualize that there's an LHS/RHS exchange of passing the value of "2" (by way of variable "a's" RHS look-ip) into log(...). 
Inside of the native implementation of log(...), we can assume it has parameters, the first of which is "arg1", which has an LHS reference look-up, before assigning "2" to it. 
*/


//Engine/Scope Conversation

function foo(a) {
  console.log(a); //2
}

foo(2);

/*
Lets imagine the above exchange as a conversation

Engine: Hey Scope, I have an RHS reference for "foo". Ever heard of it?

Scope: Why yes, I have. Compiler declared it just a second ago, He's a function. Here you go.

Engine: Great, thanks! Ok, I'm executing "foo".

Engine: Hey Scope, I've got an LHS reference for "a", ever heard of it?

Scope: Why yes, I have. Compiler declared it as a formal paramter to "foo" just recently. Here you go.

Engine: Helpful as always, Scope. Thanks again. Now, time to assign "2" to "a".

Engine: Hey, Scope, sorry to bother you again. I need an RHS look-up for console. Ever hear of it?

Scope: No problem, Engine, this is what I do all day. Yes, I've got console. He's built-in. Here ya go.

Engine: Perfect. Looking up log(...). OK, great, it's a function.

Engine: Yo, Scope. Can you help me out with an RHS reference to "a". I think I remember it, but just want to double check.

Scope: You're right, Engine. Same guy, hasn't changed. Here ya go.

Engine: Cool. Passing the value of a, which is 2, into log(...).

*/


// Quiz Identify all the LHS look-ups (4) and identify all the RHS look-ups (3).

function foo(a) {
  var b = a;
  return a + b;
}

var c = foo( 2 );

/*
Quiz Answers

Identify all the LHS look-ups (there are 3!).

c = .., a = 2 (implicit param assignment) and b = ..

Identify all the RHS look-ups (there are 4!).

foo(2.., = a;, a + .. and .. + b
*/

// Nested Scope
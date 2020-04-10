\\ courtesy of Mark Thom
\\ https://gist.github.com/mthom/42878af3bf0d51274a2459faac2edaf2

(define type->string
  { A --> string }
  Str -> (make-string "~A" Str))

(datatype type-reps
  ______________________________________________
  X : (type-rep A) >> (get X type-rep) : string;

  let Tag (put (eval X) type-rep (type->string A))
  ________________________________________________
  (tag-value-with-rep X A);

  X : A; (tag-value-with-rep X A);
  ________________________________
  X : (mode (type-rep A) -);)

(define type-of
  { (type-rep A) --> string }
  X -> (get X type-rep))

(define has-type?
  { (type-rep A) --> string --> boolean }
  X Type -> (= (type-of X) Type))

(datatype generic-verification
  if (= (type->string A) Str)
  ______________________________________
  (has-type? X Str) : verified >> X : A;)

(define arbitrary-messages
  { (type-rep A) --> string }
  X -> (let Y (+ X X) (str Y)) where (has-type? X "number")
  X -> (let Y (@s X X X) Y) where (has-type? X "string")
  X -> (@s "passed a " (type-of X)))

# BRAINFUCK GENERATOR

Converts raw string into brainfuck.

### Body

```javascript
interface Payload {
  input: string
  minified?: boolean
  divident?: number
  divisor?: number
}
```

### Sample request

```rest
curl -X POST https://uptight-seal-gown.cyclic.app --header "Content-Type: application/json" --data "{ \"input\": \"Hello, World!\" }"
```

### Outputs

```text
++++
[
  > +++++ +++++
  < -
]
> +++++ +
[
  > ++  > ++  > ++  > ++  > ++  > ++  > ++  > ++  > ++  > ++
  > ++  > ++  > ++
  <<<<< <<<<< <<< -
]
> ----- ----- ----- ----- .
> +++++ ++++ .
> +++++ +++++ +++++ + .
> +++++ +++++ +++++ + .
> +++++ +++++ +++++ ++++ .
> ----- ----- ----- ----- ----- ----- ----- ----- ----- --- .
> ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
 ----- ----- .
> ----- .
> +++++ +++++ +++++ ++++ .
> +++++ +++++ +++++ +++++ ++ .
> +++++ +++++ +++++ + .
> +++++ +++ .
> ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
 ----- ---- .
```

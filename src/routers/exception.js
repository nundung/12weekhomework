
if(id === null || id === "" || id === undefined) throw new Error("아이디 값이 이상해요")
if(pw === null || pw === "" || pw === undefined) throw new Error("비밀번호 값이 이상해요")
if(name === null || pw === "" || pw === undefined) throw new Error("이름 값이 이상해요")
if(email === null || email === "" || email === undefined) throw new Error("이메일 값이 이상해요")

//아이디 정규식
var idReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
if(!idReg.test(id)) throw new Error("아이디 값이 이상해요2")
//("아이디는 영문, 숫자의 조합으로 6~18자로 입력해주세요.");
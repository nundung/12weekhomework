// import 
const exception = {};

exception.idCheck = (id) => {
    if(id === null || id === "" || id === undefined) throw new Error("아이디 값이 이상해요")

    //아이디 정규식
    var idReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
    if(!idReg.test(id)) throw new Error("아이디 값이 이상해요2")
    //("아이디는 영문, 숫자의 조합으로 6~18자로 입력해주세요.");
}

exception.pwCheck = (pw) => {
    if(pw === null || pw === "" || pw === undefined) throw new Error("비밀번호 값이 이상해요")

    //비밀번호 정규식
    var pwReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if(!pwReg.test(pw)) throw new Error("비밀번호 값이 이상해요2")
    //("비밀번호는 영문, 숫자, 특수문자의 조합으로 8~20자로 입력해주세요.");
}

exception.nameCheck = (name) => {
    if(name === null || name === "" || name === undefined) throw new Error("이름 값이 이상해요")

    //이름 정규식
    var nameReg = /^[가-힣]{2,4}$/;
    if(!nameReg.test(name)) throw new Error("이름 값이 이상해요2")
    //("이름은 한글 2~4자로 입력해주세요.")    
}

exception.emailCheck = (email) => {
    if(email === null || email === "" || email === undefined) throw new Error("이메일 값이 이상해요")

    //이메일 정규식
    var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,}$/i;
    if(!emailReg.test(email)) throw new Error("이메일 값이 이상해요2")
}

module.exports = exception;
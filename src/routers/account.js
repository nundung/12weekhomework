// Import
const router = require("express").Router()


//Apis
//회원가입 
router.post("/", (req, res) => {
    const {id, pw, name, email} = req.body
    //백엔드에서 프론트로 보내줄 값 미리 생성
    const signUpResult = {
        "success": false,
        "message": ""
    }
    try {
        //예외처리
        if(id === null || id === "" || id === undefined) throw new Error("아이디 값이 이상해요")
        if(pw === null || pw === "" || pw === undefined) throw new Error("비밀번호 값이 이상해요")
        if(name === null || pw === "" || pw === undefined) throw new Error("이름 값이 이상해요")
        if(email === null || email === "" || email === undefined) throw new Error("이메일 값이 이상해요")

        //아이디 정규식
        var idReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
        if(!idReg.test(id)) throw new Error("아이디 값이 이상해요2")
        //("아이디는 영문, 숫자의 조합으로 6~18자로 입력해주세요.");

        //비밀번호 정규식
        var pwReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if(!pwReg.test(pw)) throw new Error("비밀번호 값이 이상해요2")
        //("비밀번호는 영문, 숫자, 특수문자의 조합으로 8~20자로 입력해주세요.");

        //이름 정규식
        var nameReg = /^[가-힣]{2,4}$/;
        if(!nameReg.test(name)) throw new Error("이름 값이 이상해요2")
        //("이름은 한글 2~4자로 입력해주세요.")

        //이메일 정규식
        var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!emailReg.test(email)) throw new Error("이메일 값이 이상해요2")

        //db에 값 삽입

        //db 결과 처리
        result.success = true
    }
    catch (e) {
        result.message = e.message
    }
    finally {
        res.send(result)
    }
})

//아이디 중복체크
router.post("/id", (req, res) => {
    const {id} = req.body
    const checkIdResult = {
        "success": false,
        "message": "",
        // "data": {
        // "isDuplicated" : false
        // }
    }
    try {
        //예외처리
        if(id === null || id === "" || id === undefined) throw new Error("아이디 값이 이상해요")

        //아이디 정규식
        var idReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
        if(!idReg.test(id)) throw new Error("아이디 값이 이상해요2")

        //db에 값 삽입

        //db 결과 처리
        result.success = true
    }
    catch (e) {
        result.message = e.message
    }
    finally {
        res.send(result)
    }
})

//로그인
router.post("/login", (req, res) => {
    const {id, pw} = req.body
    const logInResult = {
        "success": false,
        "message": ""
    }
    try {
        //예외처리
        if(id === null || id === "" || id === undefined) throw new Error("아이디 값이 이상해요")
        if(pw === null || pw === "" || pw === undefined) throw new Error("비밀번호 값이 이상해요")

        //아이디 정규식
        var idReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
        if(!idReg.test(id)) throw new Error("아이디 값이 이상해요2")

        //비밀번호 정규식
        var pwReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if(!pwReg.test(pw)) throw new Error("비밀번호 값이 이상해요2")
    }
    catch (e) {
        result.message = e.message
    }
    finally {
        res.send(result)
    }
})

//내정보 보기
router.get("/info", (req, res) => {
    //id값은 세션에서 받아줘서 :id
    const infoResult = {
        "success": false,
        "message": ""
    }
})

//내정보 수정
router.put("/info", (req, res) => {
    const {pw, name, email} = req.body
    const editInfoResult = {
        "success": false,
        "message": ""
    }
    try {
        //예외처리
        if(pw === null || pw === "" || pw === undefined) throw new Error("비밀번호 값이 이상해요")
        if(name === null || pw === "" || pw === undefined) throw new Error("이름 값이 이상해요")
        if(email === null || email === "" || email === undefined) throw new Error("이메일 값이 이상해요")

        //비밀번호 정규식
        var pwReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if(!pwReg.test(pw)) throw new Error("비밀번호 값이 이상해요2")

        //이름 정규식
        var nameReg = /^[가-힣]{2,4}$/;
        if(!nameReg.test(name)) throw new Error("이름 값이 이상해요2")

        //이메일 정규식
        var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!emailReg.test(email)) throw new Error("이메일 값이 이상해요2")

        //db에 값 삽입

        //db 결과 처리
        result.success = true
    }
    catch (e) {
        result.message = e.message
    }
    finally {
        res.send(result)
    }
})

//계정 삭제
router.delete("/", (req, res) => {
    const {userId} = req.body
    const deleteResult = {
        "success": false,
        "message": ""
    }
})

module.exports = router
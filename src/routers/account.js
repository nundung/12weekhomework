// Import
const router = require("express").Router()
const session = require("express-session");
const conn = require('../../database/connect/maria');

//Apis
//회원가입 & 아이디/이메일 중복체크
router.post("/", async (req, res) => {
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
        var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,}$/i;
        if(!emailReg.test(email)) throw new Error("이메일 값이 이상해요2")

        //아이디 중복체크
        conn.query('SELECT * FROM account WHERE id=?', [id], (err, results) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요");
            }
            else {
                if (results.length > 0) {
                    throw new Error("이미 사용 중인 아이디입니다.");
                }
            }
        });

        //이메일 중복체크
        conn.query('SELECT * FROM account WHERE email=?', [email], (err, results) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요");
            } else {
                if (results.length > 0) {
                    throw new Error("이미 사용 중인 이메일입니다.");
                }
            }
        });

        // 아이디/이메일 중복이 아닌 경우 회원가입 진행
        conn.query('INSERT INTO account (id, pw, name, email) VALUES (?, ?, ?, ?)', [id, pw, name, email], (err, results) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            } 
            else {
                Object.assign(signUpResult, { success: true, message: "회원가입에 성공했습니다."});
                res.send(signUpResult)
            }
        });

    }catch (e) {
        signUpResult.message = e.message;
        res.status(400).send(signUpResult);
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
        if (req.session.user) throw new Error("이미 로그인 되어있습니다.")

        if(id === null || id === "" || id === undefined) throw new Error("아이디 값이 이상해요")
        if(pw === null || pw === "" || pw === undefined) throw new Error("비밀번호 값이 이상해요")

        //아이디 정규식
        var idReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
        if(!idReg.test(id)) throw new Error("아이디 값이 이상해요2")

        //비밀번호 정규식
        var pwReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if(!pwReg.test(pw)) throw new Error("비밀번호 값이 이상해요2")
    
        //db값 불러오기
        conn.query('SELECT * FROM account WHERE id=? AND pw=?', [id, pw], (err, results) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요");
            } 
            else {
                if (results.length === 0 || results[0] === undefined) {
                    // 로그인 실패: 해당 아이디와 비밀번호로 계정을 찾을 수 없음
                    logInResult.message = "아이디 또는 비밀번호가 올바르지 않습니다.";
                    res.status(400).send(logInResult);
                } else {
                    // 로그인 성공
                    req.session.user = {
                        idx: results[0].idx,
                        id: results[0].id,
                        pw: results[0].pw,
                        name: results[0].name,
                        email: results[0].email
                    };
                    logInResult.success = true;
                    logInResult.message = "로그인에 성공했습니다.";
                    res.send(logInResult);
                }
            }
        });
    }
    catch (e) {
        logInResult.message = e.message;
        res.status(400).send(logInResult);
    }
})

//로그아웃
router.get("/logout", (req, res) => {
    const logOutResult = {
        "success": false,
        "message": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 존재하지 않습니다.")
        req.session.destroy((err) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요");
            } else {
                res.clearCookie('connect.sid'); // 세션 쿠키 삭제
                Object.assign(logOutResult, { success: true, message: "로그아웃이 완료되었습니다."});
                res.send(logOutResult);
            }
        });
    }
    catch (e) {
        logOutResult.message = e.message;
        res.status(400).send(logOutResult);
    }
});

//내정보 보기
router.get("/info", (req, res) => {
    const infoResult = {
        "success": false,
        "message": "",
        "id": "",
        "pw": "",
        "name": "",
        "email": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 존재하지 않습니다.");
        const { id, pw, name, email } = req.session.user;
        Object.assign(infoResult, { success: true, message: "정보 불러오기 성공", id, pw, name, email});
        res.send(infoResult);
    }
    catch (e) {
        infoResult.message = e.message;
        res.status(400).send(infoResult);
    }
})

//내정보 수정
router.put("/info", (req, res) => {
    const {pw, name, email} = req.body
    const editInfoResult = {
        "success": false,
        "message": "",
        "id": "",
        "pw": "",
        "name": "",
        "email": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 존재하지 않습니다.");
        const id = req.session.user.id;
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

        //db에 값 업데이트
        conn.query('UPDATE account SET pw=?, name=?, email=? WHERE id=?', [pw, name, email, id], (err) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            } 
            else {
                req.session.user = {
                    pw: pw,
                    name: name,
                    email: email
                };
                Object.assign(editInfoResult, { success: true, message: "정보수정이 완료되었습니다.", id, pw, name, email});
                res.send(editInfoResult)
            }
        });
    }
    catch (e) {
        editInfoResult.message = e.message;
        res.status(400).send(editInfoResult);
    }
})

//계정 삭제
router.delete("/", (req, res) => {
    const deleteAccountResult = {
        "success": false,
        "message": ""
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 없습니다.");
        const idx = req.session.user.id;

        //db에 값 업데이트
        conn.query('DELETE FROM account WHERE idx=?', [idx], (err) => {
            if (err) {
                throw new Error("데이터베이스가 이상해요")
            } 
            else {
                Object.assign(deleteAccountResult, { success: true, message: "회원탈퇴가 완료되었습니다."});
                res.send(deleteAccountResult)
            }
        })
    }
    catch (e) {
        deleteAccountResult.message = e.message;
        res.status(400).send(deleteAccountResult);
    }
})

module.exports = router
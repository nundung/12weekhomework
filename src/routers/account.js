// Import
const router = require("express").Router()
const conn = require('../../database/connect/maria')
const exception = require('../modules/exception')

//Apis
//회원가입 & 아이디/이메일 중복체크
router.post("/", (req, res) => {
    const {id, pw, name, email} = req.body
    //백엔드에서 프론트로 보내줄 값 미리 생성
    const signUpResult = {
        "success": false,
        "message": ""
    }
    try {
        exception.idCheck(id)
        exception.pwCheck(pw)
        exception.nameCheck(name)
        exception.emailCheck(email)

        //아이디 중복체크
        conn.query('SELECT * FROM account WHERE id=?', [id], (err, results) => {
            // throw new Error("데이터베이스가 이상해요")   conn.query가 비동기 함수이므로 throw를 던져도
            // 해당 예외 호출 지점으로 전달되지 않음.
            if (err) return res.send(signUpResult)
            if (results.length > 0) {
                signUpResult.message = "이미 사용 중인 아이디입니다."
                return res.send(signUpResult)
            }
            //이메일 중복체크
            conn.query('SELECT * FROM account WHERE email=?', [email], (err, results) => {
                if (err) return res.send(signUpResult)
                if (results.length > 0) {
                    signUpResult.message = "이미 사용 중인 이메일입니다."
                    return res.send(signUpResult)
                }
                // 아이디/이메일 중복이 아닌 경우 회원가입 진행
                conn.query('INSERT INTO account (id, pw, name, email) VALUES (?, ?, ?, ?)', [id, pw, name, email], (err) => {
                if (err) return res.send(signUpResult)
                signUpResult.success = true
                res.send(signUpResult)
                })
            })
        })
    }
    catch (e) {
        signUpResult.message = e.message
        res.status(400).send(signUpResult)
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
        exception.idCheck(id)
        exception.pwCheck(pw)

        //db값 불러오기
        conn.query('SELECT * FROM account WHERE id=? AND pw=?', [id, pw], (err, results) => {
            if (err) return res.send(logInResult)
            if (results.length === 0 || results === undefined) {
                // 로그인 실패: 해당 아이디와 비밀번호로 계정을 찾을 수 없음
                logInResult.message = "아이디 또는 비밀번호가 올바르지 않습니다."
                return res.send(logInResult);
            }
            // 로그인 성공
            req.session.user = {
                idx: results[0].idx,
                id: results[0].id,
                pw: results[0].pw,
                name: results[0].name,
                email: results[0].email
            }
            console.log(req.session.user);
            logInResult.success = true
            res.send(logInResult)
        })
    }
    catch (e) {
        logInResult.message = e.message
        res.status(400).send(logInResult)
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
            if (err) res.send(logOutResult)
            else {
                res.clearCookie('connect.sid')  // 세션 쿠키 삭제
                logOutResult.success = true
                res.send(logOutResult)
            }
        })
    }
    catch (e) {
        logOutResult.message = e.message
        res.status(400).send(logOutResult)
    }
})

//내정보 보기
router.get("/info", (req, res) => {
    const infoResult = {
        "success": false,
        "message": "",
        "data": null
    }
    try {
        if (!req.session.user) throw new Error("세션에 사용자 정보가 존재하지 않습니다.")
        const { id, pw, name, email } = req.session.user
    console.log(id, pw, name, email)
        infoResult.success = true
        infoResult.data = {id, pw, name, email}
        res.send(infoResult)
    }
    catch (e) {
        infoResult.message = e.message
        res.status(400).send(infoResult)
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
        if (!req.session.user) throw new Error("세션에 사용자 정보가 존재하지 않습니다.");
        const idx = req.session.user.idx
        const currentemail = req.session.user.email
        exception.pwCheck(pw)
        exception.nameCheck(name)
        exception.emailCheck(email)
        //이메일 중복체크
        //이메일이 바뀌었을 때만 실행
        if (currentemail !== email) {
            conn.query('SELECT * FROM account WHERE email=?', [email], (err, results) => {
                if (err) return res.send(signUpResult)
                if (results.length > 0) {
                    editInfoResult.message = "이미 사용 중인 이메일입니다."
                    return res.send(editInfoResult)
                }
                updateInfoEvent()
            })
        }
        else {updateInfoEvent()}
        
        //정보 수정
        const updateInfoEvent = () => {
            conn.query('UPDATE account SET pw=?, name=?, email=? WHERE idx=?', [pw, name, email, idx], (err) => {
            if (err) return res.send(editInfoResult)
            req.session.user = {
                pw: pw,
                name: name,
                email: email
            }
            editInfoResult.success = true 
            editInfoResult.message = "정보수정이 완료되었습니다."
            res.send(editInfoResult)
            })
        }
    }
    catch (e) {
        editInfoResult.message = e.message
        res.status(400).send(editInfoResult)
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
            if (err) return res.send(deleteAccountResult)
            deleteAccountResult.success = true
            deleteAccountResult.message = "회원탈퇴가 완료되었습니다."
            res.send(deleteAccountResult)
        })
    }
    catch (e) {
        deleteAccountResult.message = e.message
        res.status(400).send(deleteAccountResult)
    }
})

module.exports = router
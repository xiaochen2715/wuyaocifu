window.onload = function () {
    document.forms[0].realtime.value = "";
    document.forms[0].mydebris.value = 0;
    document.forms[0].balance.value = 0;
    document.forms[0].badge.value = 0;
}

var ace = new Array(100);   //装金木水火土
var ott = new Array(100);   //装星星⭐
var allbalance = 0;     //现有余额
var count = 0;  //计数
var procount = 0;
var alldebris = 0; //碎片总数
var carnum = 0;     //车钥匙
//记录打印事件
function printfun(str,nort) {   //nort值决定是否换行
    if (nort == "n") {
        document.getElementById("record").appendChild(document.createTextNode("\n"+str));
    }if (nort == "t") {
        document.getElementById("record").appendChild(document.createTextNode("\t"+str));
    }
}
//点击充值金额
function pay() {
    var paymoney = prompt("充值金额：","");
    if (paymoney>=0){
        allbalance = Number(document.forms[0].balance.value);
        allbalance += Number(paymoney);
        document.forms[0].balance.value = allbalance;   //更新余额
    }
    if(paymoney<0){
        alert("请输入正确金额！");
    }else if (paymoney) {
        printfun("----------\n"+getTime()+"\t充值金额："+paymoney+",余额："+allbalance,"n");
    }else if (paymoney == "") {
        printfun("你没有输入充值金额！","n");
    }else{
        printfun("你取消了充值！","n");
    }
}
//点击清空记录
function clearrecord() {
    document.getElementById("record").innerHTML = "记录：\n";
}
//点击抽奖
function f() {
    if (document.getElementById("sp").innerHTML == "NULL") {
        if (allbalance < 6){
            alert("余额不足，请前往充值！");
            document.forms[0].balance.focus();
        }else{
            count = 0;  //赋予初始值
            allbalance -= 6;
            document.forms[0].balance.value = allbalance;   //更新余额
            printfun("----------","n");
            document.getElementById("record").appendChild(document.createTextNode("\n"+getTime()));
            ace[count] = face();
            ott[count] = fott();
            printfun("余额-6\t抽奖："+ace[count]+ott[count],"n");
            document.forms[0].realtime.value = ace[count]+ott[count];
            document.getElementById("sp").innerHTML = "五曜令牌×" + getdebris(document.forms[0].realtime.value.length-1); //更新当前碎片
            if (document.forms[0].realtime.value.length - 1 == 3) {
                document.getElementById("jp").innerHTML = getprize(ace[count],ott[count].length);
            }
            changebhzj(document.forms[0].realtime.value.length-1);  //更改保护追加按钮
            count++;
            document.forms[0].cj.style.display = "none";    //隐藏“抽奖”按钮
            document.forms[0].ptzj.style.display = "inline";    //显示“普通追加”按钮
            document.forms[0].bhzj.style.display = "inline";    //显示“保护追加”按钮
            document.forms[0].lqjl.style.display = "inline";    //显示“领取奖励”按钮
        }
    }else{
        alert("请先领取奖励！");
    }
    procount = 0;
}
//点击普通追加
function f1() {
    ace[count] = face();
    ott[count] = fott();
    printfun("普通追加："+ace[count]+ott[count],"n");
    if (ace[count] == document.forms[0].realtime.value.charAt(0)) {     //追加成功
        printfun("普通追加成功！","t");
        document.forms[0].realtime.value = document.forms[0].realtime.value.concat(ott[count]);
        document.getElementById("sp").innerHTML = "五曜令牌×" + getdebris(document.forms[0].realtime.value.length-1); //更新当前碎片
        if (document.forms[0].realtime.value.length - 1 >= 3) {
            document.getElementById("jp").innerHTML = getprize(document.forms[0].realtime.value.charAt(0),document.forms[0].realtime.value.length-1);
        }
        count++;
    }else{      //追加失败
        printfun("普通追加失败！","t");
        adddefeat(document.forms[0].realtime.value.length-1);
        document.forms[0].ptzj.style.display = "none";    //隐藏“普通追加”按钮
        document.forms[0].bhzj.style.display = "none";    //隐藏“保护追加”按钮
        document.forms[0].cj.style.display = "inline";    //显示“抽奖”按钮
        // if (document.forms[0].realtime.value.length - 1 < 3) {  //如果星星⭐数少于3
        //     document.forms[0].lqjl.style.display = "none";    //隐藏“领取奖励”按钮
        // }
    }
    procount = 0;
    uplimit();
    changebhzj(document.forms[0].realtime.value.length-1);  //更改保护追加按钮
}
//点击保护追加
function f2() {
    if (spendbhzj(document.forms[0].realtime.value.length - 1)) {   //如果余额足够
        if (procount < 2) {
            ace[count] = face();
            ott[count] = fott();
            printfun("保护追加："+ace[count]+ott[count],"t");
            if (ace[count] == document.forms[0].realtime.value.charAt(0)) {     //追加成功
                printfun("第"+(procount+1)+"次保护追加成功！","t");
                document.forms[0].realtime.value = document.forms[0].realtime.value.concat(ott[count]);
                document.getElementById("sp").innerHTML = "五曜令牌×" + getdebris(document.forms[0].realtime.value.length-1); //更新当前碎片
                if (document.forms[0].realtime.value.length - 1 >= 3) {
                    document.getElementById("jp").innerHTML = getprize(document.forms[0].realtime.value.charAt(0),document.forms[0].realtime.value.length-1);
                }
                count++;
                procount = 0;
            }else{      //追加失败
                printfun("第"+(procount+1)+"次保护追加失败！","t");
                procount++;
            }
        }else{
            ace[count] = ace[0];
            ott[count] = fott();
            printfun("保护追加："+ace[count]+ott[count],"t");
            document.forms[0].realtime.value = document.forms[0].realtime.value.concat(ott[count]);
            printfun("第"+(procount+1)+"次保护追加成功！","t");
            document.getElementById("sp").innerHTML = "五曜令牌×" + getdebris(document.forms[0].realtime.value.length-1); //更新当前碎片
            if (document.forms[0].realtime.value.length - 1 >= 3) {
                document.getElementById("jp").innerHTML = getprize(document.forms[0].realtime.value.charAt(0),document.forms[0].realtime.value.length-1);
            }
            procount = 0;
        }
        changebhzj(document.forms[0].realtime.value.length-1);  //更改保护追加按钮
    }else{

    }
    uplimit();
    allbalance = document.forms[0].balance.value;
}
//点击领取奖励
function f3() {
    if (!document.getElementById("pr1").checked&&!document.getElementById("pr2").checked) {
        alert("请选择一项领取！");
    }else{
        if (document.getElementById("pr1").checked&&document.getElementById("sp").innerHTML == "NULL"||document.getElementById("pr2").checked&&document.getElementById("jp").innerHTML == "NULL") {
            alert("没有奖励可领！");
        }else{
            if (document.getElementById("pr1").checked&&document.getElementById("sp").innerHTML != "NULL") {   //如果选中碎片且不为空
                printfun("你选择领取了--"+document.getElementById("sp").innerHTML,"n");
                document.forms[0].mydebris.value = Number(document.forms[0].mydebris.value) + getdebris(document.forms[0].realtime.value.length-1);
            }
            if (document.getElementById("pr2").checked&&document.getElementById("jp").innerHTML != "NULL") {    //如果选中奖品且不为空
                printfun("你选择领取了--"+document.getElementById("jp").innerHTML,"n");
               //获得玛莎钥匙
                if (document.forms[0].realtime.value.length-1 == 6) {
                    document.forms[0].badge.value = Number(document.forms[0].badge.value)+1;
                }else if (document.forms[0].realtime.value.length-1 >=7) {
                    document.forms[0].badge.value = Number(document.forms[0].badge.value)+3;
                }else{
                    document.getElementById("mine").appendChild(document.createTextNode("\n"+document.getElementById("jp").innerHTML));

                }
            }
            document.getElementById("pr1").checked = false;
            document.getElementById("pr2").checked = false;
            document.forms[0].realtime.value = "";
            document.getElementById("sp").innerHTML = "NULL";
            document.getElementById("jp").innerHTML = "NULL";
            document.forms[0].cj.style.display = "inline";    //显示“抽奖”按钮
            document.forms[0].ptzj.style.display = "none";    //隐藏“普通追加”按钮
            document.forms[0].bhzj.style.display = "none";    //隐藏“保护追加”按钮
            document.forms[0].lqjl.style.display = "inline";    //隐藏“领取奖励”按钮
        }
    }
    document.forms[0].balance.value = allbalance;
}
//点击打开和关闭碎片商店
function f4() {
    if (document.forms[0].spsd.value=="打开碎片商店") {
        //alert("open");
        document.getElementById("exchange").style.display = "inline";
        document.forms[0].spsd.value="关闭碎片商店";
    }else{
        //alert("close");
        document.getElementById("exchange").style.display = "none";
        document.forms[0].spsd.value="打开碎片商店";
    }
}
//金木水火土概率
function face() {
    var rdm1 = Math.floor(10*Math.random());
    if (rdm1 == 0 || rdm1 == 1) {
        return "金";
    }
    if (rdm1 == 2 || rdm1 == 3) {
        return "木";
    }
    if (rdm1 == 4 || rdm1 == 5) {
        return "水";
    }
    if (rdm1 == 6 || rdm1 == 7) {
        return "火";
    }
    if (rdm1 == 8 || rdm1 == 9) {
        return "土";
    }
}
//星星⭐概率
function fott() {
    var rdm2 = 10*Math.random();
    if (rdm2 < 8.2) {
        return "⭐";
    }else if (rdm2 < 9.9) {
        return "⭐⭐";
    }else{
        return "⭐⭐⭐";
    }
}
//星星⭐对应碎片数
function getdebris(leng) {    //getdebris(星星个数)
    if (leng == 1) {
        return 12;
    }
    if (leng == 2) {
        return 36;
    }
    if (leng == 3) {
        return 54;
    }
    if (leng == 4) {
        return 160;
    }
    if (leng == 5) {
        return 480;
    }
    if (leng == 6) {
        return 1440;
    }
    if (leng == 7||leng == 8||leng == 9) {
        return 4320;
    }
}
//星星⭐对应奖品
function getprize(ace,leng) {   //getdebris(五行种类,星星个数)
    var rdm = 10*Math.random();
    var pstr ;
    if (leng == 3) {
        if (rdm > 6.6) {pstr = "平底锅-五爪金龙";}
        else if (rdm > 3.3) {pstr = "至尊龙雀降落伞";}
        else{pstr = "背包挂件-";}
        switch (ace) {
            case "金":if (rdm > 3.3) {return pstr;}else{return pstr+"金曜白虎";}break;
            case "木":if (rdm > 3.3) {return pstr;}else{return pstr+"木曜青龙";}break;
            case "水":if (rdm > 3.3) {return pstr;}else{return pstr+"水曜玄武";}break;
            case "火":if (rdm > 3.3) {return pstr;}else{return pstr+"火曜朱雀";}break;
            case "土":if (rdm > 3.3) {return pstr;}else{return pstr+"土曜战麒";}break;
        }
    }
    if (leng == 4) {
        if (rdm < 5) {pstr = "背包";}
        else{pstr = "头盔";}
        switch (ace) {
            case "金":return "金曜白虎"+pstr;break;
            case "木":return "木曜青龙"+pstr;break;
            case "水":return "水曜玄武"+pstr;break;
            case "火":return "火曜朱雀"+pstr;break;
            case "土":return "土曜战麒"+pstr;break;
        }
    }
    if (leng == 5) {
        if (rdm > 6.6) {pstr = "M416-五爪金龙";}
        else if (rdm > 3.3) {pstr = "至尊龙雀飞行服";}
        else{pstr = "套装-";}
        switch (ace) {
            case "金":if (rdm > 3.3) {return pstr;}else{return pstr+"金曜白虎";}break;
            case "木":if (rdm > 3.3) {return pstr;}else{return pstr+"木曜青龙";}break;
            case "水":if (rdm > 3.3) {return pstr;}else{return pstr+"水曜玄武";}break;
            case "火":if (rdm > 3.3) {return pstr;}else{return pstr+"火曜朱雀";}break;
            case "土":if (rdm > 3.3) {return pstr;}else{return pstr+"土曜战麒";}break;
        }
    }
    if (leng == 6) {
        return "玛莎拉蒂兑换徽章×1";
    }
    if (leng == 7||leng == 8||leng == 9) {
        return "玛莎拉蒂兑换徽章×3";
    }
}
//普通追加失败
function adddefeat(leng) {      //leng星星数  追加失败
    var rdm3 = 10*Math.random();
    if(leng == 1){
        printfun("降一星\t已领取五曜令牌×2","n");
        document.forms[0].realtime.value = document.forms[0].realtime.value.substring(0,document.forms[0].realtime.value.length-1);
        document.getElementById("sp").innerHTML = "NULL"; //更新当前碎片
        document.forms[0].mydebris.value = Number(document.forms[0].mydebris.value) + 2;
        //return 2;
    }else{
        if (rdm3 < 7.5) {       //降一星的情况
            document.forms[0].realtime.value = document.forms[0].realtime.value.substring(0,document.forms[0].realtime.value.length-1);
            if (leng == 2) {
                printfun("降一星\t已领取五曜令牌×12","n");
                document.getElementById("sp").innerHTML = "NULL"; //更新当前碎片
                document.forms[0].mydebris.value = Number(document.forms[0].mydebris.value) + 12;
                //return 12;
            }
            if (leng == 3) {
                printfun("降一星\t已领取五曜令牌×36","n");
                document.getElementById("sp").innerHTML = "NULL"; //更新当前碎片
                document.forms[0].mydebris.value = Number(document.forms[0].mydebris.value) + 36;
                //return 36;
            }
            if (leng == 4) {
                printfun("降一星\t请前往领取奖励","n");
                document.getElementById("sp").innerHTML = "五曜令牌×54"; //更新当前碎片
                //return 54;
            }
            if (leng == 5) {
                printfun("降一星\t请前往领取奖励","n");
                document.getElementById("sp").innerHTML = "五曜令牌×160"; //更新当前碎片
                //return 160;
            }
            if (leng == 6) {
                printfun("降一星\t请前往领取奖励","n");
                document.getElementById("sp").innerHTML = "五曜令牌×480"; //更新当前碎片
                //return 480;
            }
        }else{      //降两星的情况
            document.forms[0].realtime.value = document.forms[0].realtime.value.substring(0,document.forms[0].realtime.value.length-2);
            if(leng == 2){
                printfun("降两星\t已领取五曜令牌×4","n");
                document.getElementById("sp").innerHTML = "NULL"; //更新当前碎片
                document.forms[0].mydebris.value = Number(document.forms[0].mydebris.value) + 4;
                //return 4;
            }
            if (leng == 3) {
                printfun("降两星\t已领取五曜令牌×12","n");
                document.getElementById("sp").innerHTML = "NULL"; //更新当前碎片
                document.forms[0].mydebris.value = Number(document.forms[0].mydebris.value) + 12;
                //return 12;
            }
            if (leng == 4) {
                printfun("降两星\t已领取五曜令牌×36","n");
                document.getElementById("sp").innerHTML = "NULL"; //更新当前碎片
                document.forms[0].mydebris.value = Number(document.forms[0].mydebris.value) + 36;
                //return 36;
            }
            if (leng == 5) {
                printfun("降两星\t请前往领取奖励","n");
                document.getElementById("sp").innerHTML = "五曜令牌×54"; //更新当前碎片
                //return 54;
            }
            if (leng == 6) {
                printfun("降两星\t请前往领取奖励","n");
                document.getElementById("sp").innerHTML = "五曜令牌×160"; //更新当前碎片
                //return 160;
            }
        }
    }
    if (document.forms[0].realtime.value.length - 1 < 3) {
        document.getElementById("jp").innerHTML = "NULL";
    }
    if (document.forms[0].realtime.value.length - 1 >= 3) {
        document.getElementById("jp").innerHTML = getprize(document.forms[0].realtime.value.charAt(0),document.forms[0].realtime.value.length-1);
    }else{
        document.getElementById("jp").innerHTML = "NULL";
    }
}
//更改保护追加按钮
function changebhzj(leng) {
    switch (leng) {
        case 1:document.forms[0].bhzj.value = "保护追加(6)";break;
        case 2:document.forms[0].bhzj.value = "保护追加(17)";break;
        case 3:document.forms[0].bhzj.value = "保护追加(51)";break;
        case 4:document.forms[0].bhzj.value = "保护追加(153)";break;
        case 5:document.forms[0].bhzj.value = "保护追加(440)";break;
        case 6:document.forms[0].bhzj.value = "保护追加(827)";break;
    }
}
//保护追加扣除多少钱
function spendbhzj(leng) {
    allbalance = document.forms[0].balance.value;
    switch (leng) {
        case 1:if (allbalance < 6) {
            alert("余额不足，请前往充值！");
            document.forms[0].balance.focus();
            return false;
        }else{
            printfun("余额-6","n");
            document.forms[0].balance.value = allbalance - 6;
            return true;
        }break;
        case 2:if (allbalance < 17) {
            alert("余额不足，请前往充值！");
            document.forms[0].balance.focus();
            return false;
        }else{
            printfun("余额-17","n");
            document.forms[0].balance.value = allbalance - 17;
            return true;
        }break;
        case 3:if (allbalance < 51) {
            alert("余额不足，请前往充值！");
            document.forms[0].balance.focus();
            return false;
        }else{
            printfun("余额-51","n");
            document.forms[0].balance.value = allbalance - 51;
            return true;
        }break;
        case 4:if (allbalance < 153) {
            alert("余额不足，请前往充值！");
            document.forms[0].balance.focus();
            return false;
        }else{
            printfun("余额-153","n");
            document.forms[0].balance.value = allbalance - 153;
            return true;
        }break;
        case 5:if (allbalance < 440) {
            alert("余额不足，请前往充值！");
            document.forms[0].balance.focus();
            return false;
        }else{
            printfun("余额-440","n");
            document.forms[0].balance.value = allbalance - 440;
            return true;
        }break;
        case 6:if (allbalance < 827) {
            alert("余额不足，请前往充值！");
            document.forms[0].balance.focus();
            return false;
        }else{
            printfun("余额-827","n");
            document.forms[0].balance.value = allbalance - 827;
            return true;
        }break;
    }
    allbalance = document.forms[0].balance.value;
}
//获取当前时间
function getTime() {
    var date = new Date();
    var minu,seco;
    if (date.getMinutes() < 10) {
        minu = "0" +date.getMinutes();
    }else{
        minu = date.getMinutes();
    }
    if (date.getSeconds() < 10) {
        seco = "0" +date.getSeconds();
    }else{
        seco = date.getSeconds();
    }
    return date.getHours()+":"+minu+":"+seco;
}
//保证星星⭐上限为7颗
function uplimit() {
    if (document.forms[0].realtime.value.length - 1 >= 7) {
        document.forms[0].realtime.value = document.forms[0].realtime.value.substring(0,8);
        document.forms[0].ptzj.style.display = "none";    //隐藏“普通追加”按钮
        document.forms[0].bhzj.style.display = "none";    //隐藏“保护追加”按钮
        printfun("⭐已达上限7，请前往领取奖励。","n");
    }
}
//点击兑换
function f5() {
    var chec = new Array(30);
    var ids;
    var msids;
    for (var i = 0; i < 24; i++) {
        chec[i] = document.forms[0].changer[i].checked;
        if (chec[i] == false) {
            chec[28] = true;    //chec[28]决定除了玛莎拉蒂之外的单选框是否存在选中
        }else{
            chec[28] = false;
            ids = document.forms[0].changer[i].id;
            //alert(document.forms[0].changer[i].id);
            break;
        }
    }
    for (var i = 25; i < 28; i++) {
        chec[i] = document.forms[0].changer[i].checked;
        if (chec[i] == false) {
            chec[29] = true;    //chec[29]决定单选框玛莎拉蒂是否存在选中
        }else{
            chec[29] = false;
            msids = document.forms[0].changer[i].id;
            //alert(document.forms[0].changer[i].id);
            break;
        }
    }
    if (document.getElementById("h1").checked==true) {  //如果选中玛莎徽章
        if (Number(document.forms[0].mydebris.value) >= 2916) {
            if (confirm("确定用2916个五曜令牌兑换\"玛莎拉蒂兑换徽章\"？")) {
                document.forms[0].mydebris.value = Number(document.forms[0].mydebris.value)-2916;
                document.forms[0].badge.value = Number(document.forms[0].badge.value)+1;
                printfun(getTime()+"\n你成功兑换了--玛莎拉蒂兑换徽章","n")
            }else {
                alert("你取消了兑换！");
            }
        }else{
            alert("碎片不足！");
        }
    }else if (!chec[29]) {       //如果选中了玛莎拉蒂
        ff1(msids);
    }else {     //如果选中了其他的
        if (chec[28]) {
            alert("请选择一项");
        }else{
            ff0(ids);
        }
    }
}
function ff0(ids) {     //ids--单选框的id值
    if (Number(document.forms[0].mydebris.value)>=Number(ff(ids,2))){
        if (confirm("确定用"+ff(ids,2)+"个五曜令牌兑换\"" + ff(ids, 1)+"\"？")) {
            document.forms[0].mydebris.value = Number(document.forms[0].mydebris.value)-Number(ff(ids,2));
            document.getElementById("mine").appendChild(document.createTextNode("\n"+ff(ids,1)));
            printfun(getTime()+"\n你成功兑换了--"+ff(ids,1),"n");
            //alert("兑换成功");
        }else{
            alert("你取消了兑换！");
        }
    }else{
        alert("碎片不足！");
    }
}
function ff1(ids) {     //ids--单选框的id值
    if (Number(document.forms[0].badge.value) >= Number(document.getElementById(ids).value.substring(document.getElementById(ids).value.length - 1, document.getElementById(ids).value.length))) {
        if (confirm("确定用" + Number(document.getElementById(ids).value.substring(document.getElementById(ids).value.length - 1, document.getElementById(ids).value.length)) + "个徽章兑换\"" + document.getElementById(ids).value.substring(0, document.getElementById(ids).value.length - 1)+"\"?")) {
            document.forms[0].badge.value = Number(document.forms[0].badge.value)-Number(document.getElementById(ids).value.substring(document.getElementById(ids).value.length - 1, document.getElementById(ids).value.length));
            document.getElementById("mine").appendChild(document.createTextNode("\n"+document.getElementById(ids).value.substring(0, document.getElementById(ids).value.length - 1)));
            printfun(getTime()+"\n你成功兑换了--"+document.getElementById(ids).value.substring(0, document.getElementById(ids).value.length - 1),"n");
        }else{
            alert("你取消了兑换！");
        }
    }else{
        alert("玛莎拉蒂兑换徽章不足！");
    }
}
function ff(ids,kv) {   //ids--单选框的id值
    if (kv == 1) {
        if (document.getElementById(ids).checked){
            return document.getElementById(ids).value.substring(0,document.getElementById(ids).value.length-3);
            //alert(document.getElementById(ids).value.substring(0,document.getElementById(ids).value.length-3));
        }
    }
    if (kv == 2) {
        if (document.getElementById(ids).checked){
            return document.getElementById(ids).value.substring(document.getElementById(ids).value.length-3,document.getElementById(ids).value.length);
            //alert(document.getElementById(ids).value.substring(document.getElementById(ids).value.length-3,document.getElementById(ids).value.length));
        }
    }
}
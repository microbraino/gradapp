const config = require('../config/cors');
module.exports = function (interview, account) {
    return `<div id="m_465539474959039174maincontent" style="max-width:620px;font-size:0;margin:0 auto">
    <table style="width:100%" cellspacing="0" cellpadding="0" border="0">
        <tbody>
            <tr>
                <td>
                    <table style="width:100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                            <tr>
                                <td style="padding-bottom:20px" align="center">
                                    <table
                                        style="font-family:'Open+Sans','Open Sans',Helvetica,Arial,sans-serif;font-size:13px;line-height:18px;color:#00c0ea;text-align:center;width:152px"
                                        cellspacing="0" cellpadding="0" border="0">
                                        <tbody>
                                            <tr>
                                                <td style="padding:20px 0 10px 0">
                                                    <a href="${config.apiServer}swagger"
                                                        style="text-decoration:none" target="_blank"
                                                        data-saferedirecturl="${config.apiServer}swagger"><img
                                                            alt="IZTECH"
                                                            src="${config.apiServer}public/iyte_logo-tur.png"
                                                            style="display:block;width:152px!important;font-family:'Open+Sans','Open Sans',Helvetica,Arial,sans-serif;font-size:22px;line-height:26px;color:#000000;text-transform:uppercase;text-align:center;letter-spacing:1px"
                                                            class="CToWUd" width="152" height="152" border="0"></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table style="width:100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                            <tr>
                                <td style="width:7px;font-size:1px" bgcolor="#fafbfc">&nbsp;</td>
                                <td style="width:1px;font-size:1px" bgcolor="#f5f6f7">&nbsp;</td>
                                <td style="width:1px;font-size:1px" bgcolor="#f0f2f3">&nbsp;</td>
                                <td style="width:1px;font-size:1px" bgcolor="#edeef1">&nbsp;</td>
                                <td bgcolor="#ffffff">
                                    <table style="width:100%" cellspacing="0" cellpadding="0" border="0">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="text-align:center;padding:40px 40px 40px 40px;border-top:3px solid #02b3e4">

                                                    <div style="display:inline-block;width:100%;max-width:520px">
                                                        <table
                                                            style="font-family:'Open+Sans','Open Sans',Helvetica,Arial,sans-serif;font-size:14px;line-height:24px;color:#525c65;text-align:left;width:100%"
                                                            cellspacing="0" cellpadding="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <p
                                                                            style="Margin:0px 0px 20px 0px;font-size:17px;line-height:23px;color:#102231">
                                                                            Interview Appointment!
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        style="font-family:Arial,Helvetica,sans-serif;color:#363636;font-size:16px">
                                                                        Dear ${account.name} ${account.surname},<br> an interview appointment setted for you. Please be preapared on time at given location:
                                                                        <br><br>
                                                                        Applicant: ${account.name} ${account.surname}<br>
                                                                        Date: ${interview.date}<br>
                                                                        Location: ${interview.location}<br><br>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding:15px 0 30px 0" align="center">
                                                                        <table
                                                                            style="border-collapse:separate!important;border-radius:15px;width:240px"
                                                                            cellspacing="0" cellpadding="0" border="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" align="center">

                                                                                        <a href="${config.apiServer}swagger"
                                                                                            style="background-color:#01b3e3;border-collapse:separate!important;border-top:10px solid #01b3e3;border-bottom:10px solid #01b3e3;border-right:45px solid #01b3e3;border-left:45px solid #01b3e3;border-radius:4px;color:#ffffff;display:inline-block;font-family:'Open+Sans','Open Sans',Helvetica,Arial,sans-serif;font-size:14px;text-align:center;text-decoration:none;letter-spacing:2px"
                                                                                            target="_blank"
                                                                                            data-saferedirecturl="${config.apiServer}swagger">Go
                                                                                            to Notifications
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                    style="font-family:Arial,Helvetica,sans-serif;color:#363636;font-size:16px">
                                                                    Good Luck :),
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        style="font-family:Arial,Helvetica,sans-serif;color:#363636;padding-top:20px;font-size:16px">
                                                                        IZTECH Admission Office
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="height:1px;width:100%;line-height:1px;font-size:0"
                                                    bgcolor="#e0e2e5">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="height:1px;width:100%;line-height:1px;font-size:0"
                                                    bgcolor="#e0e2e4">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="height:1px;width:100%;line-height:1px;font-size:0"
                                                    bgcolor="#e8ebed">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="height:1px;width:100%;line-height:1px;font-size:0"
                                                    bgcolor="#f1f3f6">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style="width:1px;font-size:1px" bgcolor="#edeef1">&nbsp;</td>
                                <td style="width:1px;font-size:1px" bgcolor="#f0f2f3">&nbsp;</td>
                                <td style="width:1px;font-size:1px" bgcolor="#f5f6f7">&nbsp;</td>
                                <td style="width:7px;font-size:1px" bgcolor="#fafbfc">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
           
            <tr>
                <td style="padding:20px 20px 40px 20px" align="center">
                    <table
                        style="font-family:'Open+Sans','Open Sans',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;text-align:center;width:auto"
                        cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                            <tr>
                                <td style="color:#b7bdc1">
                                    <p style="color:#b7bdc1;padding-top:20px"><span><a
                                                style="text-decoration:none!important;color:#b7bdc1">IZTECH&nbsp; •
                                                &nbsp;Gülbahçe Kampüsü &nbsp; • &nbsp;Urla, İzmir, Türkiye
                                                35430</a></span></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>`;
}
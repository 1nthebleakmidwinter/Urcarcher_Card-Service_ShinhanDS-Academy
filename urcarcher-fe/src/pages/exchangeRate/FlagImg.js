import USD from 'assets/icon-nation/icon-us.png'
import JPY from 'assets/icon-nation/icon-jp.png'
import CNY from 'assets/icon-nation/icon-cn.png'
import LYD from 'assets/icon-nation/icon-lyd.png'
import AED from 'assets/icon-nation/icon-aed.png'
import AUD from 'assets/icon-nation/icon-aud.png'
import BDT from 'assets/icon-nation/icon-bdt.png'
import BHD from 'assets/icon-nation/icon-bhd.png'
import BRD from 'assets/icon-nation/icon-brd.png'
import BRL from 'assets/icon-nation/icon-brl.png'
import CAD from 'assets/icon-nation/icon-cad.png'
import CHF from 'assets/icon-nation/icon-chf.png'
import CLP from 'assets/icon-nation/icon-clp.png'
import COP from 'assets/icon-nation/icon-cop.png'
import CZK from 'assets/icon-nation/icon-czk.png'
import DKK from 'assets/icon-nation/icon-dkk.png'
import DZD from 'assets/icon-nation/icon-dzd.png'
import EGP from 'assets/icon-nation/icon-egp.png'
import ETB from 'assets/icon-nation/icon-etb.png'
import EUR from 'assets/icon-nation/icon-eur.png'
import FJD from 'assets/icon-nation/icon-fjd.png'
import GBP from 'assets/icon-nation/icon-gbp.png'
import HKD from 'assets/icon-nation/icon-hkd.png'
import HUF from 'assets/icon-nation/icon-huf.png'
import IDR from 'assets/icon-nation/icon-idr.png'
import ILS from 'assets/icon-nation/icon-ils.png'
import INR from 'assets/icon-nation/icon-inr.png'
import JOD from 'assets/icon-nation/icon-jod.png'
import KES from 'assets/icon-nation/icon-kes.png'
import KHR from 'assets/icon-nation/icon-khr.png'
import KWD from 'assets/icon-nation/icon-kwd.png'
import KZT from 'assets/icon-nation/icon-kzt.png'
import LKR from 'assets/icon-nation/icon-lkr.png'
import MMK from 'assets/icon-nation/icon-mmk.png'
import MNT from 'assets/icon-nation/icon-mnt.png'
import MOP from 'assets/icon-nation/icon-mop.png'
import MXN from 'assets/icon-nation/icon-mxn.png'
import MYR from 'assets/icon-nation/icon-myr.png'
import NOK from 'assets/icon-nation/icon-nok.png'
import NPR from 'assets/icon-nation/icon-npr.png'
import NZD from 'assets/icon-nation/icon-nzd.png'
import OMR from 'assets/icon-nation/icon-omr.png'
import PHP from 'assets/icon-nation/icon-php.png'
import PKR from 'assets/icon-nation/icon-pkr.png'
import PLN from 'assets/icon-nation/icon-pln.png'
import QAR from 'assets/icon-nation/icon-qar.png'
import RON from 'assets/icon-nation/icon-ron.png'
import RUB from 'assets/icon-nation/icon-rub.png'
import SEK from 'assets/icon-nation/icon-sek.png'
import SGD from 'assets/icon-nation/icon-sgd.png'
import THB from 'assets/icon-nation/icon-thb.png'
import TRY from 'assets/icon-nation/icon-try.png'
import TWD from 'assets/icon-nation/icon-twd.png'
import TZS from 'assets/icon-nation/icon-tzs.png'
import UZS from 'assets/icon-nation/icon-uzs.png'
import VND from 'assets/icon-nation/icon-vnd.png'
import ZAR from 'assets/icon-nation/icon-zar.png'
import BND from 'assets/icon-nation/icon-bnd.png'
import SAR from 'assets/icon-nation/icon-sar.png'

export const flagImg = (exType) => {
    // 국가 별 국기
    const curImg = {
        USD : USD, JPY : JPY, CNY : CNY, LYD : LYD, AED : AED, AUD : AUD, SAR : SAR,
        BDT : BDT, BHD : BHD, BRD : BRD, BRL : BRL, CAD : CAD, CHF : CHF, CLP : CLP,
        COP : COP, CZK : CZK, DKK : DKK, DZD : DZD, EGP : EGP, ETB : ETB, EUR : EUR,
        FJD : FJD, GBP : GBP, HKD : HKD, HUF : HUF, IDR : IDR, ILS : ILS, INR : INR,
        JOD : JOD, KES : KES, KHR : KHR, KWD : KWD, KZT : KZT, LKR : LKR, MMK : MMK,
        MNT : MNT, MOP : MOP, MXN : MXN, MYR : MYR, NOK : NOK, NPR : NPR, NZD : NZD,
        OMR : OMR, PHP : PHP, PKR : PKR, PLN : PLN, QAR : QAR, RON : RON, RUB : RUB,
        SEK : SEK, SGD : SGD, THB : THB, TRY : TRY, TWD : TWD, TZS : TZS, UZS : UZS,
        VND : VND, ZAR : ZAR, BND : BND
    };

    // 국가 별 이미지 src
    return curImg[exType];
};
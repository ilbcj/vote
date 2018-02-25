package com.sms.gsm.gia4f;

import org.xvolks.jnative.JNative;
import org.xvolks.jnative.exceptions.NativeException;
import org.xvolks.jnative.pointers.Pointer;
import org.xvolks.jnative.util.Callback;

//////////////////////////////////////////////////////////////////////////////////////////
//事件发生回调原型
//uChannelID:通道ID
//dwUserData:用户自定义数据
//lType:事件类型ID 查看BRI_EVENT.lEventType Define
//lHandle:句柄使用值
//lResult:事件相关数据
//lParam:保留数据,扩展使用
//szData:事件相关数据
//pDataEx:附加数据,扩展使用
/////////////////////////////////////////////////////////////////////////////////////////
//typedef BRIINT32 (CALLBACK *PCallBack_Event)(BRIINT16 uChannelID,BRIUINT32 dwUserData,BRIINT32	lType,BRIINT32 lHandle,BRIINT32 lResult,BRIINT32 lParam,BRIPCHAR8 pData,BRIPCHAR8 pDataEx);

public class EventCallback implements Callback/* 实现此接口 */{

	private int myAddress = -1;
	public EventCallback() {

	}

	/**
	 * Method callback java对应于dll中的回调函数
	 * 
	 * @param values
	 *            an long[] 参数数组，非整型数代表的都是地址
	 * @return an int
	 * @version 11/26/2013
	 */
	public int callback(long[] values) {
		if (values == null) {
			System.out.println("callback ret " + -1);
			return -1;
		}
		System.out.println("参数的个数"+ values.length);
		if (values.length == 8) {
			String szData = "";
//			String szDataEx = "";
			int lType = (int)values[3];
			long lResult = values[4];
			try { 
				int iCh = (int)values[0];
				Pointer _pointer = Pointer.createPointerToNativeMemory(
						(int) values[6], 1024); /* 获取字符串通过指针 */
//				Pointer _pointer1 = Pointer.createPointerToNativeMemory(
//						(int) values[7], 1024);

				szData = _pointer.getAsString() ;
			//	szDataEx = _pointer1.getAsString();				
				String str = "",strValue="";
				strValue= "Handle="+values[3]+ "Result=" + lResult+  "Data=" + szData ;
				switch(lType)
				{
				case BriSDKLib.BriEvent_PhoneHook:
					{//电话接通后根据对方阻抗大小，声音会变大变小,200就太大，中间幅度200就太大,一般电话机100可以
						/*
						QNV_SetParam(pEvent->uChannelID,QNV_PARAM_DTMFVOL,50);
						QNV_SetParam(pEvent->uChannelID,QNV_PARAM_DTMFLEVEL,4);
						QNV_SetParam(pEvent->uChannelID,QNV_PARAM_DTMFNUM,9);
						QNV_SetParam(pEvent->uChannelID,QNV_PARAM_DTMFLOWINHIGH,20);
						QNV_SetParam(pEvent->uChannelID,QNV_PARAM_DTMFHIGHINLOW,20);
						*/
						//str.Format("通道%d: 电话机摘机,演示修改检测DTMF灵敏度,DTMFVOL=50/DTMFLEVEL=5/DTMFNUM=10,如果检测不到电话机拨号就修改该值更小",m_nChannelID+1);
						if(BriSDKLib.QNV_General(iCh,BriSDKLib.QNV_GENERAL_ISDIALING,0, null) <= 0)
						{
							//QNV_SetDevCtrl(m_nChannelID,QNV_CTRL_DOHOOK,0);//没有正在拨号可以考虑自动软挂机,避免3方通话状态，话机里有背景音出现
						}
						str= "通道"+iCh+ ": 电话机摘机";
					}break;
				case BriSDKLib.BriEvent_PhoneHang:
					{
					//	QNV_SetParam(pEvent->uChannelID,QNV_PARAM_DTMFVOL,5);
					//	QNV_SetParam(pEvent->uChannelID,QNV_PARAM_DTMFLEVEL,3);
					//	QNV_SetParam(pEvent->uChannelID,QNV_PARAM_DTMFNUM,6);
					//	str.Format("通道%d: 电话机挂机,演示修改检测DTMF灵敏度",m_nChannelID+1);
						str= "通道" + iCh + ": 电话机挂机";
				}break;
				case BriSDKLib.BriEvent_CallIn:
					str = "通道"+ iCh +": 来电响铃 " + strValue;
					break;
				case BriSDKLib.BriEvent_GetCallID:
					{
						long lSerial= BriSDKLib.QNV_DevInfo(iCh,BriSDKLib.QNV_DEVINFO_GETSERIAL);
						str= "通道" +  iCh +": 接收到来电号码 "+ szData;
					}break;
				case BriSDKLib.BriEvent_StopCallIn:
					str = "通道"+ iCh +": 停止呼入,产生一个未接电话 "+ szData;break;
				case BriSDKLib.BriEvent_DialEnd:
					{
						if(BriSDKLib.QNV_GetDevCtrl(iCh,BriSDKLib.QNV_CTRL_PHONE) > 0)
						{
							//QNV_SetDevCtrl(m_nChannelID,QNV_CTRL_DOHOOK,0);//电话机已经拿着可以考虑自动软挂机,避免3方通话状态，话机里有背景音出现
						}
						str = "通道:" + iCh +" 拨号结束 "+ strValue;
					}break;
				case BriSDKLib.BriEvent_PlayFileEnd:
					str = "通道" + iCh + ": 播放文件结束 " + strValue;break;
				case BriSDKLib.BriEvent_PlayMultiFileEnd:
					str = "通道" + iCh +": 多文件连播结束 %s"+ strValue;break;
				case BriSDKLib.BriEvent_RepeatPlayFile:
					str = "通道"+iCh + ": 循环播放文件 %s"+ strValue;break;
				case BriSDKLib.BriEvent_PlayStringEnd:
					str= "通道" +iCh+ ": 播放字符结束 %s" + strValue;break;
				case BriSDKLib.BriEvent_SendCallIDEnd:
					str= "通道"+iCh+ ": 给话机震铃时发送号码结束 "+ strValue;break;
				case BriSDKLib.BriEvent_Silence:
					str= "通道" +iCh +": 通话中一定时间的静音 "+ strValue;break;
				case BriSDKLib.BriEvent_GetDTMFChar:
					str= "通道"+iCh+": 接收到按键  "+strValue;break;
				case BriSDKLib.BriEvent_RemoteHook:
					{
						if(BriSDKLib.HOOK_POLARITY == lResult)
						{
							str= "通道"+ iCh + ": 远程摘机(反级检测) "+ strValue ;
						}else
							str = "通道 " + iCh + ":信号音检测远程摘机信号,仅做参考 "+ strValue;
					}break;
				case BriSDKLib.BriEvent_RemoteHang:
					{
						if(BriSDKLib.HOOK_POLARITY == lResult)
						{
							str= "通道" + iCh + ": 远程挂机(反级检测) "+ strValue;
						}else
						{
							str= "通道" + iCh + ": 信号音检测远程挂机(忙音检测),仅做参考 "+ strValue;
						}
					}break;
				case BriSDKLib.BriEvent_Busy:
					str = "通道"+ iCh + ": 接收到忙音,线路可能已经断开 " + strValue;break;
				case BriSDKLib.BriEvent_DialTone:
					str= "通道" +iCh + ": 检测到拨号音 "+ strValue;break;
				case BriSDKLib.BriEvent_DialToneEx:
					str= "通道"+ iCh + ": 接通状态下检测到拨号音信号,如果是刚来电,可能是刚才的来电已经未接了,仅做参考 "+strValue;break;
				case BriSDKLib.BriEvent_PhoneDial:
					str= "通道" +iCh + ": 电话机拨号 "+ strValue;break;
				case BriSDKLib.BriEvent_RingBack:
					str= "通道" +iCh + ": 拨号后接收到回铃音 "+ strValue;break;
				case BriSDKLib.BriEvent_MicIn:
					str= "通道" +iCh + ": 麦克风插入 "+ strValue;break;
				case BriSDKLib.BriEvent_MicOut:
					str= "通道" +iCh + ": 麦克风拔出 "+ strValue;break;
				case BriSDKLib.BriEvent_FlashEnd:
					str= "通道" +iCh + ": 拍插簧完成 "+ strValue;break;
				case BriSDKLib.BriEvent_RemoteSendFax:
					str= "通道" +iCh + ": 对方准备发送传真  "+ strValue;break;
				case BriSDKLib.BriEvent_FaxRecvFinished:
					str= "通道" +iCh + ": 接收传真完成  "+ strValue;break;
				case BriSDKLib.BriEvent_FaxRecvFailed:
					str= "通道" +iCh + ": 接收传真失败  "+ strValue;break;
				case BriSDKLib.BriEvent_FaxSendFinished:
					str= "通道" +iCh + ": 发送传真完成  "+ strValue;break;
				case BriSDKLib.BriEvent_FaxSendFailed:
					str= "通道" +iCh + ": 发送传真失败  "+ strValue;break;
				case BriSDKLib.BriEvent_RefuseEnd:
					str= "通道" +iCh + ": 拒接来电完成  "+ strValue;break;	
				case BriSDKLib.BriEvent_RecvedFSK:
					{
						if(lResult == BriSDKLib.CALLIDMODE_FSK) 
							str= "通道" +iCh + ": 接收到来电号码信息FSK数据  "+ strValue;	
						else 
							str= "通道" +iCh + ": 接收到来电号码信息DTMF数据  "+ strValue;
					}break;	
				case BriSDKLib.BriEvent_PSTNFree:
					{
						str= "通道" +iCh + ":  PSTN线路已空闲  "+ strValue;
						//WriteCallLog(m_nChannelID);
					}break;	
				case BriSDKLib.BriEvent_CheckLine:
					{
						if( (lResult & BriSDKLib.CHECKLINE_MASK_DIALOUT)>0 )
						{
							str= "通道" +iCh + ":[ok]***线路拨号音正常,能正常软拨号***-----------------";				
						}else
						{
							str= "通道" +iCh + "[err]线路拨号音不正常,可能不能正常软拨号，检查LINE口线路";	
						}					
						if( (lResult & BriSDKLib.CHECKLINE_MASK_REV)>0 )
						{
							str= "通道" +iCh + "[ok]***线路LINE口/PHONE口未接反***----------------------";					
						}else
						{
							str= "通道" +iCh + "[err]线路LINE口/PHONE口可能接反了";
						}
					}break;
				case BriSDKLib.BriEvent_DevErr:
					{
						str= "通道" +iCh + ": 设备发生错误  "+ strValue;		
						if(lResult == 3)// || (atol(pEvent->szData)&0xFF) == 6)//检测到移除获取多个失败
						{
							/*
							QNV_CloseDevice(ODT_CHANNEL,m_nChannelID);
							long lChNum=QNV_DevInfo(0,QNV_DEVINFO_GETCHANNELS);
							str.Format("当前通道数量:%d,考虑重新初始化所有设备",lChNum<0?0:lChNum);
							*/

						}
					}break;
				case BriSDKLib.BriEvent_PlugOut:
					{
						str= "通道" +iCh + ": 设备被拔掉  ";			
					}break;
				case BriSDKLib.BriEvent_EnableHook:
					{
						str= "通道" +iCh + ": HOOK被控制 lResult= " + lResult;					
					}break;
				case BriSDKLib.BriEvent_EnablePlay:
					{
						str= "通道" +iCh + ": 喇叭被控制 lResult= " + lResult;	
					}break;
				case BriSDKLib.BriEvent_EnablePlayMux:
					{
						str= "通道" +iCh + ": 喇叭mux修改 lResult= " + lResult;
					}break;
				case BriSDKLib.BriEvent_DoStartDial:
					{
						if(lResult == BriSDKLib.CHECKDIALTONE_FAILED)
						{
							str= "通道" +iCh + ": 自动拨号失败，未检测到拨号音,请检查线路";
						}else
						{
							str= "通道" +iCh + ": 开始拨号 data=" + szData;
						}
					}break;
				case BriSDKLib.BriEvent_DevCtrl:
					{
						if(lResult == BriSDKLib.QNV_CTRL_PLAYTOLINE)
						{
							if(Integer.parseInt(szData) > 0)
							{
								str = "播放到线路状态  打开";
							}else
							{
								str = "播放到线路状态 关闭";
							}
						}
					}break;
				default:
					{
						strValue= "通道:"+iCh +"其它忽略事件 eventid= "+lType + "Result=" + lResult+  "Data=" + szData ;
					}break;
				}

				if(lType == BriSDKLib.BriEvent_RemoteSendFax && lResult == 1)
				{
					//BFU_FaxTooltip(m_nChannelID,"",TTIP_AUTORECV);
					/*
					if(MessageBox("对方准备发送传真，是否接收?","传真提示",MB_YESNO|MB_ICONWARNING) == IDYES)
					{
						BFU_StartRecvFax(m_nChannelID,"",0);
					}
					*/
				}
			
				System.out.println( str );

			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
	

			return 1;
		} else {
			System.out.println("Bad number of arguments ! 8 expected "
					+ values.length + " found");
			System.out.println("callback ret " + 2);
			return 2;
		}
	}

	/**
	 * java回调函数地址
	 */

        public int getCallbackAddress() throws NativeException {
            if(myAddress == -1) {
                    myAddress = JNative.createCallback(8, this);
            }
            return myAddress;
	}

}

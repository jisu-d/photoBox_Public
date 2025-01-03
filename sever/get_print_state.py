# import cups

# # CUPS 서버에 연결
# conn = cups.Connection()

# # 프린터 목록 가져오기
# printers = conn.getPrinters()

# printStates = []

# # 특정 프린터 상태를 반환하는 함수
# def getPrintState(printname):
#     if printname in printers:
#         printer_info = printers[printname]
#         printer_state = printer_info['printer-state']
        
#         # 상태에 따른 설명을 반환
#         # if printer_state == 3:
#         #     return "대기 중 (Idle)"
#         # elif printer_state == 4:
#         #     return "인쇄 중 (Printing)"
#         # elif printer_state == 5:
#         #     return "중지됨 (Stopped)"
#         # else:
#         #     return f"알 수 없는 상태 코드: {printer_state}"
#         if len(printStates) > 0 and printStates[-1] == 4 and printer_state == 3:
#             printStates.append(6)
#             return 6
#         else:
#             printStates.append(printer_state)
#             return printer_state
#     else:
#         return "해당 프린터를 찾을 수 없습니다."

# print(getPrintState('Canon_SELPHY_CP1300_'))
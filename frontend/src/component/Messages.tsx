type MessagesType = {
  comment: string;
  assign: string;
  status: string;
  onChangeComment: (comment: string) => void;
  onChangeStatus: (status: string) => void;
  onChangeAssign: (assign: string) => void;
};

const Messages = ({
  comment,
  assign,
  status,
  onChangeAssign,
  onChangeStatus,
  onChangeComment,
}: MessagesType) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex flex-col gap-4 p-4 bg-white border border-gray-300 w-1/6 h-1/2">
      <div className="flex flex-col mt-4">
        <textarea
          className="p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={comment}
          placeholder="Nhập thông tin ở đây"
          onChange={(e) => onChangeComment(e.target.value)}
        ></textarea>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span>assign</span>
          <select
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={assign}
            onChange={(e) => onChangeAssign(e.target.value)}
          >
            <option value="HOANG VAN HIEU">HOANG VAN HIEU</option>
            <option value="NGUYEN VAN DUNG">NGUYEN VAN DUNG</option>
            <option value="HUYNH TUAN THANH">HUYNH TUAN THANH</option>
            <option value="NGUYEN VAN VAN">NGUYEN VAN VAN</option>
            <option value="VO NHAT QUANG">VO NHAT QUANG</option>
          </select>
        </div>
        <div className="flex flex-col">
          <span>status</span>
          <select
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={status}
            onChange={(e) => onChangeStatus(e.target.value)}
          >
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Messages;

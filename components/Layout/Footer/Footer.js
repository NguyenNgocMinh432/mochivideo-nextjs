import footerStyles from "./_footer.module.scss";

function Footer(props) {
  return (
    <div className= { footerStyles.footer_component }>
		<div className = { footerStyles.footer_component__content }>
			<p>Học tiếng Anh miễn phí qua những video thú vị thuộc chủ đề đa dạng</p>
			<p>Tra cứu từ vựng tiếng Anh tiện lợi ngay trong quá trình xem video</p>
			<p>Trải nghiệm học tiếng Anh chưa bao giờ hiệu quả và đầy hứng khởi như vậy</p>
			<p>Chọn một video và bắt đầu ngay với MochiMochi nhé!</p>
		</div>
    </div>
  )
}

export default Footer
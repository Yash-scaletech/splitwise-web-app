const Layout: React.FC = (props) => {
	return (
		<div
			className="app width--full m--0-auto layout-container"
			style={
				{
					'--screen-height': `${window.innerHeight}px`
				} as React.CSSProperties
			}
		>
			<main className="app-main-content-wrapper scroll-container--vertical no--bar">{props.children}</main>
		</div>
	);
};

export default Layout;

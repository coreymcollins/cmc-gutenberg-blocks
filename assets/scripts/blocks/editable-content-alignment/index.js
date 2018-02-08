/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
	Editable,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar
} = wp.blocks;

/**
* Register block
*/
export default registerBlockType(
	'cmcgutenberg/editable-content-alignment',
	{
		title: __( 'CMC - Editable Content Block with Content Alignment' ),
		category: 'common',
		icon: 'editor-alignleft',
		keywords: [
			__( 'Content' ),
			__( 'Editable' ),
			__( 'Toolbar' ),
		],
		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.content-block-content',
			},
			alignment: {
				type: 'string',
			},
		},
		edit: props => {

			// Change the message value as we type.
			const onChangeMessage = value => {
				props.setAttributes( { message: value } );
			};

			// Listen for an alignment change.
			const onChangeAlignment = value => {
				props.setAttributes( { alignment: value } );
			};

			return (
				<div className={ props.className }>
					<h2>{ __( 'CMC - Editable Content Block with Content Alignment' ) }</h2>

					{
						!! props.focus && (
							<BlockControls key="controls">
							<AlignmentToolbar
								value={ props.attributes.alignment }
								onChange={ onChangeAlignment }
							/>
							</BlockControls>
						)
					}
					<Editable
						tagName="div"
						multiline="p"
						className="content-block-content"
						style={ { textAlign: props.attributes.alignment } }
						placeholder={ __( 'Enter your content here' ) }
						onChange={ onChangeMessage }
						value={ props.attributes.message }
						focus={ props.focus }
						onFocus={ props.setFocus }
					/>
				</div>
			);
		},
		save: props => {
			return (
				<div>
					<h2>{ __( 'CMC - Editable Content Block with Content Alignment' ) }</h2>
					<div
						class="content-block-content"
						style={ { textAlign: props.attributes.alignment } }
					>
						{ props.attributes.message }
					</div>
				</div>
			);
		},
	},
);

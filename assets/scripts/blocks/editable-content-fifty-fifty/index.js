/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
	Editable
} = wp.blocks;

/**
* Register block
*/
export default registerBlockType(
	'cmcgutenberg/editable-content-fifty-fifty',
	{
		title: __( 'CMC - Editable Title and Content - Fifty Fifty' ),
		category: 'common',
		icon: 'edit',
		keywords: [
			__( 'Content' ),
			__( 'Editable' ),
			__( 'Multiline' ),
		],
		attributes: {
			messageLeft: {
				type: 'array',
				source: 'children',
				selector: '.content-block-left',
			},
			messageRight: {
				type: 'array',
				source: 'children',
				selector: '.content-block-right',
			}
		},
		edit: props => {

			// Change the Left message value as we type.
			const onChangeMessageLeft = value => {
				props.setAttributes( { messageLeft: value } );
			};

			// Change the Right message value as we type.
			const onChangeMessageRight = value => {
				props.setAttributes( { messageRight: value } );
			};

			return (
				<div className={ props.className }>
					<h2>{ __( 'CMC Editable Content Block - Fifty Fifty' ) }</h2>

					<h2>{ __( 'Left Block' ) }</h2>
					<Editable
						tagName="div"
						multiline="p"
						className="content-block-left"
						placeholder={ __( 'Enter your content here for the left Fifty Fifty block' ) }
						onChange={ onChangeMessageLeft }
						value={ props.attributes.messageLeft }
					/>

					<h2>{ __( 'Right Block' ) }</h2>
					<Editable
						tagName="div"
						multiline="p"
						className="content-block-right"
						placeholder={ __( 'Enter your content here for the right Fifty Fifty block' ) }
						onChange={ onChangeMessageRight }
						value={ props.attributes.messageRight }
					/>
				</div>
			);
		},
		save: props => {
			return (
				<div>
					<h2>{ __( 'CMC Editable Content Block - Fifty Fifty' ) }</h2>
					<div class="content-block-content content-block-left">
						{ props.attributes.messageLeft }
					</div>
					<div class="content-block-content content-block-right">
						{ props.attributes.messageRight }
					</div>
				</div>
			);
		},
	},
);

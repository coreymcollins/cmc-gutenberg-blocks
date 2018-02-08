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
	'cmcgutenberg/editable-content',
	{
		title: __( 'CMC - Editable Content Block' ),
		category: 'common',
		icon: 'edit',
		keywords: [
			__( 'Content' ),
			__( 'Editable' ),
		],
		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.content-block-content',
			}
		},
		edit: props => {

			// Change the message value as we type.
			const onChangeMessage = value => {
				props.setAttributes( { message: value } );
			};

			return (
				<div className={ props.className }>
					<h2>{ __( 'CMC - Editable Content Block' ) }</h2>
					<Editable
						tagName="div"
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
					<h2>{ __( 'CMC - Editable Content Block' ) }</h2>
					<div class="content-block-content">
						{ props.attributes.message }
					</div>
				</div>
			);
		},
	},
);

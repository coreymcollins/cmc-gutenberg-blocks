/**
 * Block dependencies
 */
import classnames from 'classnames';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
	Editable,
	BlockControls,
	InspectorControls,
	BlockDescription,
} = wp.blocks;
const {
	Dashicon,
	Toolbar,
	Button,
	Tooltip,
	PanelBody,
	PanelRow,
	FormToggle,
} = wp.components;

/**
* Register block
*/
export default registerBlockType(
	'cmcgutenberg/editable-content-repeater',
	{
		title: __( 'CMC - Experimental Editable Content Block Repeater (non-working)' ),
		category: 'common',
		icon: 'edit',
		keywords: [
			__( 'Content' ),
			__( 'Editable' ),
			__( 'Repeater' ),
		],
		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.content-block-content',
			},
		},

		edit: props => {

			// Change the Left message value as we type.
			const onChangeMessage = value => {
				props.setAttributes( { message: value } );
			};

			// Start a count variable!
			let repeaterCount = 1;

			return (
				<div className={ props.className }>
					<h2>{ __( 'CMC - Experimental Editable Content Block Repeater (non-working)' ) }</h2>

					<h2>{ __( 'Maybe A Repeater?' ) }</h2>
					<Editable
						tagName="div"
						multiline="p"
						className="content-block-content"
						placeholder={ __( 'Enter your content here for the initial block' ) }
						onChange={ onChangeMessage }
						value={ props.attributes.message }
					/>

					{ props.attributes.message ? (
						<div>
							{ repeaterCount++ }

							<h2>{ __( 'Maybe A Repeater? This is number ' ) + repeaterCount }</h2>
							<Editable
								tagName="div"
								multiline="p"
								className={ "content-block-content-" + repeaterCount }
								placeholder={ __( 'Enter your content here for a conditionally created block' ) }
								onChange={ onChangeMessage }
								value={ props.attributes.message }
							/>
						</div>
					) : (
						<div />
					)}

				</div>
			);
		},
		save: props => {
			return (
				<div>
					<h2>{ __( 'CMC - Experimental Editable Content Block Repeater (non-working)' ) }</h2>
					<div class="content-block-content">
						{ props.attributes.message }
					</div>
				</div>
			);
		},
	},
);

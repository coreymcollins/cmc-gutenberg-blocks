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
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
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
	'cmcgutenberg/editable-content-fifty-fifty-with-options',
	{
		title: __( 'CMC - Editable Content Fifty Fifty Block with Option' ),
		category: 'common',
		icon: 'edit',
		keywords: [
			__( 'Content' ),
			__( 'Editable' ),
			__( 'Fifty Fifty 50/50 Options' ),
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
			},
			alignment: {
				type: 'string',
			},
			someOption: {
				type: 'boolean',
				default: false,
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

			// Toggle our option.
			const toggleSomeOption = () => {
				props.setAttributes( { someOption: ! props.attributes.someOption } );
			};

			return [
				!! props.focus && (
					<InspectorControls key="inspector">

						<BlockDescription>
							<p>{ __( 'Some options for your nifty Fifty Fifty!' ) }</p>
						</BlockDescription>

						<PanelBody title={ __( 'Fifty Fifty Options Panel' ) }>

							<PanelRow>
								<label
									htmlFor="some-option-toggle"
									className="blocks-base-control__label"
								>
									{ __( 'Some Option' ) }
								</label>
								<FormToggle
									id="some-option-toggle"
									label={ __( 'Some Option' ) }
									checked={ !! props.attributes.someOption }
									onChange={ toggleSomeOption }
								/>
							</PanelRow>

						</PanelBody>

					</InspectorControls>
				),
				!! props.focus  && (
					<BlockControls key="controls">
						<AlignmentToolbar
							value={ props.attributes.alignment }
							onChange={ ( value ) => props.setAttributes( { alignment: value } ) }
						/>
						<Toolbar
							className="components-toolbar"
						>
							<Tooltip text={ __( 'Some Option') }>
								<Button
									className={ classnames(
										"components-icon-button",
										"components-toolbar__control",
										{ "is-active": props.attributes.someOption },
									) }
									onClick={ toggleSomeOption }
								>
									<Dashicon icon="admin-settings" />
								</Button>
							</Tooltip>
						</Toolbar>
					</BlockControls>
				),
				<div className={ props.className }>
					<h2>{ __( 'CMC - Editable Content Fifty Fifty Block with Option' ) }</h2>

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
			];
		},
		save: props => {
			return (
				<div
					className={ classnames(
						"the-parent-container",
						{ 'some-option': props.attributes.someOption },
					) }
				>
					<h2>{ __( 'CMC - Editable Content Fifty Fifty Block with Option' ) }</h2>
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

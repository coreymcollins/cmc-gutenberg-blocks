/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
	Editable,
	MediaUploadButton,
} = wp.blocks;
const {
	Button,
} = wp.components;

/**
* Register block
*/
export default registerBlockType(
	'cmcgutenberg/editable-content-media',
	{
		title: __( 'CMC - Editable Title and Content with Media' ),
		category: 'common',
		icon: 'edit',
		keywords: [
			__( 'Content' ),
			__( 'Editable' ),
			__( 'Media Upload' ),
		],
		attributes: {
			imgURL: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: 'img',
			},
			imgID: {
				type: 'number',
			},
			imgAlt: {
				type: 'string',
				source: 'attribute',
				attribute: 'alt',
				selector: 'img',
			},
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

			// Select an image.
			const onSelectImage = img => {
				props.setAttributes( {
					imgID: img.id,
					imgURL: img.url,
					imgAlt: img.alt,
				} );
			};

			// Remove an image.
			const onRemoveImage = () => {
				props.setAttributes( {
					imgID: null,
					imgURL: null,
					imgAlt: null,
				} );
			};

			return (
				<div className={ props.className }>
					<h2>{ __( 'CMC Editable Content Block with Media' ) }</h2>
					{ ! props.attributes.imgID ? (
						<MediaUploadButton
							buttonProps={ {
								className: 'components-button button button-large'
							} }
							onSelect={ onSelectImage }
							type="image"
							value={ props.attributes.imgID }
						>
						<Button>
							{ __( 'Upload Image' ) }
						</Button>
						</MediaUploadButton>
					) : (
						<p class="image-wrapper">
							<img
								src={ props.attributes.imgURL }
								alt={ props.attributes.imgAlt }
							/>
							{ props.focus ? (
								<Button
									className="remove-image"
									onClick={ onRemoveImage }
								>
									{ __( 'Remove Image') }
								</Button>
							) : null }
						</p>
					)}
					<Editable
						tagName="div"
						multiline="p"
						className="content-block-content"
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
					<h2>{ __( 'CMC Editable Content Block with Media' ) }</h2>
					<div class="content-block-image">
						<img
							src={ props.attributes.imgURL }
							alt={ props.attributes.imgAlt }
						/>
					</div>
					<div class="content-block-content">
						{ props.attributes.message }
					</div>
				</div>
			);
		},
	},
);

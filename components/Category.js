import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { colors } from '../colors'

export const Category = ({ category, showSeparator, showCategory }) => {
    const { wording, description, group } = category
    return (
        <View>
            {category.wording ? (
                <View>
                    {showCategory && group?.name && (
                        <View style={styles.groupNameContainer}>
                            <Text
                                style={{
                                    paddingVertical: 4,
                                    paddingHorizontal: 8,
                                    borderRadius: 50,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    backgroundColor: group.color
                                        ? colors[group.color + 'Light']
                                        : colors.defaultLight,
                                    color: group.color ? colors[group.color] : colors.default,
                                }}
                            >
                                {group.name}
                            </Text>
                        </View>
                    )}
                    <View style={styles.elementContainer}>
                        {wording && <Text style={styles.elementWording}>{wording}</Text>}
                        {description && (
                            <Text style={styles.elementDescription}>{description}</Text>
                        )}
                    </View>
                    {/* Add a separator only if it is not the last element */}
                    {showSeparator && <View style={styles.elementSeparator} />}
                </View>
            ) : (
                <></>
            )}
        </View>
    )
}

Category.propTypes = {
    category: PropTypes.shape({
        wording: PropTypes.string,
        description: PropTypes.string,
        group: PropTypes.shape({ name: PropTypes.string, color: PropTypes.string }),
    }),
    showCategory: PropTypes.bool,
    showSeparator: PropTypes.bool,
}

const styles = StyleSheet.create({
    groupNameContainer: {
        alignSelf: 'flex-start',
    },
    elementContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: 10,
    },
    elementWording: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    elementDescription: {
        color: colors.grey,
    },
    elementSeparator: {
        borderColor: colors.separator,
        borderWidth: 1,
    },
})
